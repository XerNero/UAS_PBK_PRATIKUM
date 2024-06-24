<template>
    <div>
      <WeatherWidget />
    </div>
  </template>
  
  <script>
  import WeatherWidget from '../components/WeatherWidget.vue';
  
  export default {
    name: 'Home',
    components: {
      WeatherWidget
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
  }
  
  p {
    margin-top: 10px;
  }
  </style>
  