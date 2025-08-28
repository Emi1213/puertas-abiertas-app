<!-- usuarios-ad-autocomplete.vue -->
<template>
  <div ref="containerRef" class="relative">
    <Label v-if="label" :for="id">{{ label }}</Label>

    <div class="relative">
      <Input
        :id="id"
        v-model="searchTerm"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="['pr-10', { 'border-red-500': hasError, 'opacity-50': disabled }]"
        @focus="openDropdown"
        @blur="handleInputBlur"
        @input="onInputChange"
      />

      <!-- Botón limpiar selección -->
      <button
        v-if="selectedUsuario && !disabled"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="clearSelection"
      >
        <X class="h-4 w-4" />
      </button>

      <!-- Loader -->
      <div v-else-if="isLoading && shouldSearch" class="absolute right-3 top-1/2 -translate-y-1/2">
        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
      </div>
    </div>

    <!-- Mensajes -->
    <div v-if="errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </div>

    <!-- Dropdown resultados -->
    <div
      v-if="isOpen && !disabled"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div v-if="isLoading" class="p-3 text-center text-gray-500">
        Buscando usuarios...
      </div>

      <template v-else>
        <div v-if="displayedUsuarios.length === 0" class="p-3 text-center text-gray-500">
          No se encontraron usuarios
        </div>

        <div
          v-for="user in displayedUsuarios"
          :key="user.samAccountName"
          class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          @click="selectUsuario(user)"
        >
          <div class="flex items-center gap-3">
            <!-- Avatar con iniciales -->
            <div
              class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium"
            >
              {{ getInitials(user.nombreParaMostrar) }}
            </div>

            <div class="min-w-0">
              <div class="font-medium text-gray-900 truncate">
                {{ user.nombreParaMostrar }}
              </div>
              <div class="text-sm text-gray-500 truncate">
                {{ user.correo }} · {{ user.samAccountName }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useUsuariosAdAutocomplete } from "../../composables/use-usuarios-autocomplete";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-vue-next";
import type { IUsuarioActiveDirectory } from "../../interfaces/IUsuarioActiveDirectory";

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  modelValue?: IUsuarioActiveDirectory | null;
  errorMessage?: string;
  disabled?: boolean;
}

interface Emits {
  "update:modelValue": [value: IUsuarioActiveDirectory | null];
  "update:usuarioNombre": [value: string | undefined];
}

const props = withDefaults(defineProps<Props>(), {
  id: "usuarios-ad-autocomplete",
  placeholder: "Buscar usuario...",
  disabled: false,
});

const emit = defineEmits<Emits>();
const containerRef = ref<HTMLElement>();

// Composable alineado con tu código
const {
  selectedUsuario,
  searchTerm,
  isOpen,
  isLoading,
  displayedUsuarios,
  shouldSearch,
  selectUsuario: selectUsuarioComposable,
  clearSelection: clearSelectionComposable,
  openDropdown,
  closeDropdown,
  handleInputBlur,
  setInitialUsuario,
} = useUsuariosAdAutocomplete();

const hasError = computed(() => !!props.errorMessage);

// Utilidad para iniciales desde el nombre para mostrar
const getInitials = (displayName: string): string => {
  if (!displayName) return "";
  const parts = displayName.trim().split(/\s+/);
  return parts.slice(0, 2).map(p => p[0]?.toUpperCase() ?? "").join("");
};

// Seleccionar usuario desde la lista
const selectUsuario = (user: IUsuarioActiveDirectory) => {
  selectUsuarioComposable(user);
  emit("update:modelValue", user);
  // Emitimos el usuarioNombre para quien lo necesite en formularios
  emit("update:usuarioNombre", user.usuarioNombre || user.samAccountName);
};

// Limpiar selección
const clearSelection = () => {
  clearSelectionComposable();
  closeDropdown();
  emit("update:modelValue", null);
  emit("update:usuarioNombre", undefined);
};

// Si el usuario teclea manualmente, “des-seleccionamos” el model si ya no hay selección
const onInputChange = () => {
  if (!selectedUsuario.value) {
    emit("update:modelValue", null);
    emit("update:usuarioNombre", undefined);
  }
};

// Cerrar al hacer click fuera
const handleClickOutside = (event: Event) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Valor inicial (cuando viene por v-model desde fuera)
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      setInitialUsuario(val);
    } else if (!val && selectedUsuario.value) {
      clearSelection();
    }
  },
  { immediate: true }
);
</script>
