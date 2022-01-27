import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let app = createApp(App)
app.use(router).mount('#app')

const splash_screen = document.getElementById("splash-screen");
if (sessionStorage.getItem('splash') != 'skip'){
   splash_screen.style.direction = "flex";
   sessionStorage.setItem('splash','skip');
}
else{
   splash_screen.style.display = "none";
}

