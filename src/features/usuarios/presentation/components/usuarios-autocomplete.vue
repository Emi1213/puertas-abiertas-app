<script setup lang="ts">
import { computed } from "vue";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-vue-next";
import type { IUsuarioActiveDirectory } from "../../interfaces/IUsuarioActiveDirectory";
import { useUsuariosAdAutocomplete } from "../../composables/use-usuarios-autocomplete";

interface Props {
  id?: string;
  label?: string;
  placeholder?: string;
  modelValue?: IUsuarioActiveDirectory | null;
  errorMessage?: string;
}
interface Emits {
  "update:modelValue": [value: IUsuarioActiveDirectory | null];
  "update:usuarioData": [value: IUsuarioActiveDirectory | undefined];
}

const props = withDefaults(defineProps<Props>(), {
  id: "usuario-ad-autocomplete",
  placeholder: "Buscar usuario en Active Directory...",
});
const emit = defineEmits<Emits>();

const {
  containerRef,
  selectedUsuario,
  searchTerm,
  isOpen,
  isFetching,
  displayedUsuarios,
  selectUsuario: selectUsuarioComposable,
  clearSelection: clearSelectionComposable,
  openDropdown,
  closeDropdown,
  setInitialUsuario,
} = useUsuariosAdAutocomplete();

const hasError = computed(() => !!props.errorMessage);

const selectUsuario = (usuario: IUsuarioActiveDirectory) => {
  selectUsuarioComposable(usuario);
  emit("update:modelValue", usuario);
  emit("update:usuarioData", usuario);
};

const clearSelection = () => {
  clearSelectionComposable();
  closeDropdown();
  emit("update:modelValue", null);
  emit("update:usuarioData", undefined);
};

const onInputChange = () => {
  if (!selectedUsuario.value) {
    emit("update:modelValue", null);
    emit("update:usuarioData", undefined);
  }
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

if (props.modelValue && !selectedUsuario.value) {
  setInitialUsuario(props.modelValue);
}
</script>

<template>
  <div ref="containerRef" class="relative">
    <Label v-if="label" :for="id">{{ label }}</Label>

    <div class="relative">
      <Input
        :id="id"
        v-model="searchTerm"
        :placeholder="placeholder"
        :class="['pr-10', { 'border-red-500': hasError }]"
        @focus="openDropdown"
        @input="onInputChange"
      />

      <button
        v-if="selectedUsuario"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="clearSelection"
      >
        <X class="h-4 w-4" />
      </button>

      <div
        v-else-if="isFetching && isOpen"
        class="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <div
          class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"
        />
      </div>
    </div>

    <div v-if="errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </div>

    <div
      v-show="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div v-if="isFetching" class="p-3 text-center text-gray-500">
        Buscando usuarios en Active Directory...
      </div>

      <template v-else>
        <div
          v-if="displayedUsuarios.length === 0"
          class="p-3 text-center text-gray-500"
        >
          No se encontraron usuarios en Active Directory
        </div>

        <div
          v-for="usuario in displayedUsuarios"
          :key="usuario.samAccountName"
          class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          @mousedown.prevent="selectUsuario(usuario)"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-xs font-semibold">
                {{
                  getInitials(
                    usuario.nombreParaMostrar || usuario.samAccountName
                  )
                }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-medium truncate">
                {{ usuario.nombreParaMostrar || usuario.samAccountName }}
              </div>
              <div class="text-sm text-gray-500 truncate">
                {{ usuario.correo || usuario.samAccountName }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
