<script setup lang="ts">
import { useUsuarioForm } from "../../composables/use-usuario-form";
import type { ICreateUsuario, IUsuario } from "../../interfaces/IUsuario";
import type { IPerfil } from "@/features/perfiles/interfaces/IPerfil";
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

interface Props {
  initialData?: Partial<ICreateUsuario> | Partial<IUsuario>;
  perfiles: IPerfil[];
  onSubmit: (datos: ICreateUsuario) => Promise<void>;
  onCancel: () => void;
}

const props = defineProps<Props>();

const {
  formData,
  errors,
  isLoading,
  hasErrors,
  isEditing,
  validateField,
  handleSubmit,
} = useUsuarioForm(props.initialData, props.onSubmit);
</script>
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-2">
      <Label for="usuario">Usuario</Label>
      <Input
        id="usuario"
        v-model="formData.usuario"
        placeholder="Ingrese el usuario"
        :class="{ 'border-red-500': errors.usuario }"
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
        placeholder="Ingrese el nombre completo"
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

    <!-- Campo Contraseña (solo para crear) -->
    <div v-if="!isEditing" class="space-y-2">
      <Label for="contrasenia">Contraseña</Label>
      <Input
        id="contrasenia"
        type="password"
        v-model="formData.contrasenia"
        placeholder="Ingrese la contraseña"
        :class="{ 'border-red-500': errors.contrasenia }"
        @blur="validateField('contrasenia')"
      />
      <div v-if="errors.contrasenia" class="text-sm text-red-500">
        {{ errors.contrasenia }}
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
