<script setup lang="ts">
import { ref } from "vue";
import { useUsuarioForm } from "../../composables/use-usuario-form";
import type { ICreateUsuario, IUsuario } from "../../interfaces/IUsuario";
import type { IPerfil } from "@/features/perfiles/interfaces/IPerfil";
import type { IUsuarioActiveDirectory } from "../../interfaces/IUsuarioActiveDirectory";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UsuariosAutocomplete from "./usuarios-autocomplete.vue";

interface Props {
  initialData?: Partial<ICreateUsuario> | Partial<IUsuario>;
  perfiles: IPerfil[];
  onSubmit: (datos: ICreateUsuario) => Promise<void>;
  onCancel: () => void;
}

const props = defineProps<Props>();

const selectedUsuarioAD = ref<IUsuarioActiveDirectory | null>(null);

const { formData, errors, isLoading, hasErrors, validateField, handleSubmit } =
  useUsuarioForm(props.initialData, props.onSubmit);

const handleUsuarioADSelected = (
  usuario: IUsuarioActiveDirectory | undefined
) => {
  if (usuario) {
    selectedUsuarioAD.value = usuario;
    formData.usuario = usuario.samAccountName;
    formData.nombre = usuario.nombreParaMostrar || usuario.samAccountName;
    validateField("usuario");
    validateField("nombre");
  } else {
    selectedUsuarioAD.value = null;
    formData.usuario = "";
    formData.nombre = "";
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <Label>Usuario de Active Directory</Label>
      <UsuariosAutocomplete
        id="usuario-ad"
        placeholder="Buscar usuario en Active Directory..."
        :model-value="selectedUsuarioAD"
        @update:usuario-data="handleUsuarioADSelected"
        :error-message="errors.usuario ?? undefined"
      />
      <p class="text-sm text-gray-500">
        Seleccione un usuario del Active Directory para completar
        automáticamente los campos
      </p>
    </div>
    <div class="space-y-2">
      <Label for="usuario">Usuario</Label>
      <Input
        id="usuario"
        v-model="formData.usuario"
        placeholder="Se completará automáticamente al seleccionar usuario de AD"
        :class="{ 'border-red-500': errors.usuario }"
        :readonly="!!selectedUsuarioAD"
        @blur="validateField('usuario')"
      />
      <div v-if="errors.usuario" class="text-sm text-red-500">
        {{ errors.usuario }}
      </div>
    </div>
    <div class="space-y-2">
      <Label for="nombre">Nombre completo</Label>
      <Input
        id="nombre"
        v-model="formData.nombre"
        placeholder="Se completará automáticamente al seleccionar usuario de AD"
        :class="{ 'border-red-500': errors.nombre }"
        @blur="validateField('nombre')"
      />
      <div v-if="errors.nombre" class="text-sm text-red-500">
        {{ errors.nombre }}
      </div>
    </div>
    <div class="space-y-2">
      <Label for="descripcion">Descripción (opcional)</Label>
      <Textarea
        id="descripcion"
        v-model="formData.descripcion"
        placeholder="Ingrese una descripción"
        :class="{ 'border-red-500': errors.descripcion }"
        @blur="validateField('descripcion')"
      />
      <div v-if="errors.descripcion" class="text-sm text-red-500">
        {{ errors.descripcion }}
      </div>
    </div>
    <div class="space-y-2">
      <Label for="perfil">Perfil</Label>
      <Select
        v-model="formData.perfilId"
        @update:model-value="validateField('perfilId')"
      >
        <SelectTrigger :class="{ 'border-red-500': errors.perfilId }">
          <SelectValue placeholder="Seleccione un perfil" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="perfil in perfiles"
            :key="perfil.id"
            :value="perfil.id"
          >
            {{ perfil.nombre }}
          </SelectItem>
        </SelectContent>
      </Select>
      <div v-if="errors.perfilId" class="text-sm text-red-500">
        {{ errors.perfilId }}
      </div>
    </div>
    <div class="flex justify-end space-x-3 pt-4">
      <Button
        type="button"
        variant="outline"
        @click="onCancel"
        :disabled="isLoading"
      >
        Cancelar
      </Button>
      <Button type="submit" :disabled="isLoading || hasErrors">
        <span v-if="isLoading">Guardando...</span>
        <span v-else>{{ initialData ? "Actualizar" : "Crear" }}</span>
      </Button>
    </div>
  </form>
</template>
