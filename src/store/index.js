import Vue from 'vue';
import Vuex from 'vuex';
import MainMod from './main/index.js';
import ApiPlugin from '@/plugin/model.js';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        MainMod
    },
    plugins: [ApiPlugin.fetchUserData()],
    actions: {
        is_event (c,pl)  {
            console.log(c,pl);
        }
    },
});

export default store;
