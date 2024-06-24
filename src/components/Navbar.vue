<!-- Navbar.vue -->
<template>
  <div class="navbar">
    <q-toolbar class="bg text-white">
      <q-toolbar-title>UAS PRATIKUM PBK</q-toolbar-title>
      <q-btn-dropdown
        flat
        label="TUGAS PRATIKUM"
        color="white"
        text-color="white"
        size="20px"
        dense
      >
        <q-list style="min-width: 180px">
          <q-item v-for="task in tasks" :key="task.id" clickable v-ripple @click="openProject(task.url)">
            <q-item-section>{{ task.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </div>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        tasks: [
          { id: 1, name: 'TUGAS 1', url: 'https://fortopolio-xerya.vercel.app' },
          { id: 2, name: 'TUGAS 2', url: 'https://naufal-rizqzullah-223510805-tugas-pbk-2.vercel.app' },
          { id: 3, name: 'TUGAS 3', url: 'https://naufal-rizqullah223510805tugas3-xerneros-projects.vercel.app' },
          { id: 4, name: 'TUGAS 4', url: 'https://naufalrizqullah223510805tugas4pbk-xerneros-projects.vercel.app' },
          { id: 5, name: 'TUGAS 5', url: 'https://naufal-rizqullah223510805tugas5-xerneros-projects.vercel.app' },
          { id: 6, name: 'TUGAS 6', url: 'https://naufal-rizqullah223510805tugas6-pbk-xerneros-projects.vercel.app' },
          { id: 7, name: 'TUGAS 7', url: 'https://naufalrizqullah-223510805-tugas7.vercel.app' },
        ],
      };
    },
    methods: {
      openProject(url) {
        window.open(url, '_blank');
      },
    },
  };
  </script>

  <style>

.navbar{
  background-image: url(https://r4.wallpaperflare.com/wallpaper/186/380/857/your-name-sky-stars-kimi-no-na-wa-wallpaper-c23d2485e96a9cb94e087c867ffad681.jpg);
}
  </style>