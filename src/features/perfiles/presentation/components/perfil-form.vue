<script setup lang="ts">
import { usePerfilForm } from "../../composables/use-perfil-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Modulos from "@/features/modulos/presentation/components/modulos.vue";
import type { ICreatePerfil, IPerfil } from "../../interfaces/IPerfil";

const props = defineProps<{
  onSubmit: (datos: ICreatePerfil) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<IPerfil>;
}>();

const { formData, errors, loading, isEditing, handleSubmit, validateField } =
  usePerfilForm(props.initialData);

const handleModuleToggle = (moduloId: number, checked: boolean) => {
  if (checked) {
    if (!formData.modulosIds.includes(moduloId)) {
      formData.modulosIds.push(moduloId);
    }
  } else {
    const index = formData.modulosIds.indexOf(moduloId);
    if (index > -1) {
      formData.modulosIds.splice(index, 1);
    }
  }
  validateField("modulosIds");
};
</script>

<template>
  <form @submit.prevent="handleSubmit(props.onSubmit)" class="space-y-6">
    <div>
      <Label for="nombre" class="mb-3">Nombre del Perfil</Label>
      <Input
        id="nombre"
        v-model="formData.nombre"
        placeholder="Ej: Administrador, Usuario, etc."
        @blur="() => validateField('nombre')"
      />
      <p v-if="errors.nombre" class="text-xs text-red-500 mt-1">
        {{ errors.nombre }}
      </p>
    </div>

    <div>
      <Label for="descripcion" class="mb-3">Descripción (Opcional)</Label>
      <Textarea
        id="descripcion"
        v-model="formData.descripcion"
        placeholder="Descripción del perfil..."
        rows="3"
        @blur="() => validateField('descripcion')"
      />
      <p v-if="errors.descripcion" class="text-xs text-red-500 mt-1">
        {{ errors.descripcion }}
      </p>
    </div>

    <div>
      <Label class="mb-3">Módulos Permitidos</Label>
      <Modulos v-slot="{ modulos }">
        <div
          class="border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto"
        >
          <div class="space-y-3">
            <div
              v-for="modulo in modulos"
              :key="modulo.id"
              class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded"
            >
              <input
                :id="`modulo-${modulo.id}`"
                type="checkbox"
                :checked="formData.modulosIds.includes(modulo.id)"
                @change="(e) => handleModuleToggle(modulo.id, (e.target as HTMLInputElement).checked)"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label :for="`modulo-${modulo.id}`" class="flex-1 cursor-pointer">
                <div>
                  <div class="font-medium">{{ modulo.nombre }}</div>
                  <div class="text-sm text-gray-500">{{ modulo.alias }}</div>
                </div>
              </Label>
            </div>
          </div>

          <div
            v-if="modulos.length === 0"
            class="text-center py-4 text-gray-500"
          >
            No hay módulos disponibles
          </div>
        </div>
      </Modulos>
      <p v-if="errors.modulosIds" class="text-xs text-red-500 mt-1">
        {{ errors.modulosIds }}
      </p>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t">
      <Button
        v-if="props.onCancel"
        type="button"
        variant="outline"
        @click="props.onCancel"
        :disabled="loading"
      >
        Cancelar
      </Button>
      <Button type="submit" :disabled="loading">
        {{ loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear" }}
      </Button>
    </div>
  </form>
</template>
