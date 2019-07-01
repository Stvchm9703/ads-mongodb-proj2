import Vue from 'vue';
import Vuex from 'vuex';
import MainMod from './main/index.js';
import ipcApiPlugin from '@/plugin/ipcApiClient.js';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        MainMod
    },
    plugins: [ipcApiPlugin.fetchUserData()],
    actions: {
        is_event (c,pl)  {
            console.log(c,pl);
        }
    },
});

export default store;
