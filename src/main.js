import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import './registerServiceWorker';

Vue.config.devtools = process.env.NODE_ENV === 'development';
console.log(Vue.config.devtools);
Vue.config.productionTip = process.env.NODE_ENV === 'development';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
