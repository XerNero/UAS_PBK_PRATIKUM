import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import WeatherWidget from '../components/WeatherWidget.vue'; 

const routes = [
  { path: '/', component: Home },
  { path: '/weather', component: WeatherWidget },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
