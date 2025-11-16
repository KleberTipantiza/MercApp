<script setup lang="ts"></script>

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/cart">Carrito</router-link> |
    <router-link to="/about">Acerca de</router-link>
  </nav>

  <!-- Suspense envuelve el router-view -->
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <p>Cargando vista...</p>
    </template>
  </Suspense>
</template>

<script setup>
// vacio por ahora
</script>

<style scoped></style>
