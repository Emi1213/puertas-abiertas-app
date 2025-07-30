<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/dashboard">Inicio</router-link></li>
        <li><router-link to="/companys">Empresas</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #1e40af;
  color: white;
  padding: 1rem;
  height: 100%;
}
.sidebar a {
  display: block;
  color: white;
  margin: 0.5rem 0;
  text-decoration: none;
}
.sidebar a.router-link-active {
  font-weight: bold;
}
</style>
