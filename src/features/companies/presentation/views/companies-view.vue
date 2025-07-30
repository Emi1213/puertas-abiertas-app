<script setup lang="ts">
import CompaniesTable from "../components/companies-table.vue";
import type { ICompany } from "../../interfaces/company.interface";

const staticCompanies: ICompany[] = [
  {
    id: 1,
    nombre: "Tech S.A.",
    ruc: "0991234567001",
    direccion: "Av. Amazonas 123",
    telefono: "0999999999",
    correo: "contacto@techsa.com",
    estado: true,
  },
  {
    id: 2,
    nombre: "Servicios Globales",
    ruc: "1798765432100",
    direccion: "Calle 10 y Av. Central",
    telefono: "022345678",
    correo: "info@servglobal.com",
    estado: false,
  },
  {
    id: 3,
    nombre: "Industria Andina",
    ruc: "1102345678901",
    direccion: "Av. Simón Bolívar 456",
    telefono: "032123456",
    correo: "ventas@andina.com",
    estado: true,
  },
];
</script>

<template>
  <section class="p-4">
    <h1 class="text-xl font-bold mb-4">Empresas registradas</h1>
    <CompaniesTable :companies="staticCompanies" />
  </section>
</template>
