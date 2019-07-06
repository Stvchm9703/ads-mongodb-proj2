import Vue from 'vue';
import Vuex from 'vuex';
// import MainMod from './main/index.js';
import department from './department';
import ApiPlugin from '@/plugin/model.js';
Vue.use(Vuex);
// DB server 
var conn = {
    host: "localhost",
    port: 27017,
    dbName: "scope_ADS"
};
const store = new Vuex.Store({
    modules: {
        // MainMod,
        department,
    },
    plugins: [ApiPlugin.fetchUserData(conn)],
    actions: {
        is_event (c,pl)  {
            console.log(c,pl);
        },
        onDestroy(){
            ApiPlugin.pluginOnDestroy();
        }
    },
});

export default store;
