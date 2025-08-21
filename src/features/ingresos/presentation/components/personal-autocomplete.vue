<template>
  <div class="relative">
    <Label v-if="props.label" class="mb-2" :for="props.id">{{
      props.label
    }}</Label>
    <div class="relative">
      <Input
        :id="props.id"
        v-model="searchTerm"
        :placeholder="props.placeholder"
        class="pr-10"
        @focus="isOpen = true"
        @blur="handleBlur"
      />
      <button
        v-if="searchTerm"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="clearInput"
      >
        <X class="h-4 w-4" />
      </button>
    </div>

    <div
      v-if="isOpen && filteredPersonal.length > 0"
      class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div
        v-for="person in filteredPersonal"
        :key="person.id"
        class="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
        @click="selectPerson(person)"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xs font-semibold">
              {{
                person.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }}
            </span>
          </div>
          <div>
            <div class="font-medium">{{ person.nombre }}</div>
            <div class="text-sm text-gray-500">{{ person.cargo }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-vue-next";

const props = defineProps<{
  id?: string;
  label?: string;
  placeholder?: string;
}>();

const searchTerm = ref("");
const isOpen = ref(false);

const personal = [
  { id: 1, nombre: "Juan Pérez", cargo: "Desarrollador" },
  { id: 2, nombre: "María García", cargo: "Diseñadora" },
  { id: 3, nombre: "Carlos López", cargo: "Project Manager" },
  { id: 4, nombre: "Ana Rodríguez", cargo: "QA Tester" },
  { id: 5, nombre: "Luis Martín", cargo: "DevOps" },
];

const filteredPersonal = computed(() => {
  if (!searchTerm.value) return personal;
  return personal.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const selectPerson = (person: any) => {
  searchTerm.value = person.nombre;
  isOpen.value = false;
};

const clearInput = () => {
  searchTerm.value = "";
};

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false;
  }, 200);
};
</script>
