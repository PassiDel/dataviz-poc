import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { createVuestic } from 'vuestic-ui';
import { icons } from '@/icons';

const app = createApp(App);
app
  .use(createPinia())
  .use(router)
  .use(
    createVuestic({
      config: {
        icons,
        colors: {
          presets: {
            light: {
              primary: 'rgb(10, 85, 140)',
              secondary: 'rgb(50, 180, 200)'
            }
          }
        }
      }
    })
  )
  .mount('#app');
