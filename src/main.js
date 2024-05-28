import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

createApp(App).mount('#app')

app
    .use(router)
    .mount('#app');