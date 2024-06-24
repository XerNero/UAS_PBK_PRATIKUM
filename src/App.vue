<template>
  <q-layout>
    <q-header elevated class="bg">
      <Navbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style scoped>
.bg {
  background-image: url(./assets/awal.webp);
}
</style>
