import { createApp } from 'vue';
import { Quasar } from 'quasar';
import './style.css'
// Import Quasar CSS
import 'quasar/src/css/index.sass'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Vue Router
import router from './router/index'; 

// Import App component
import App from './App.vue';

// Create Vue app instance
const app = createApp(App);

// Use Quasar with plugins if necessary
app.use(Quasar, {

});

// Use Vue Router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
