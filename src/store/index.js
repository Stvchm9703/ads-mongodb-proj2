import Vue from 'vue'
import Vuex from 'vuex'
import MainMod from './main'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    MainMod
  }
})

export default store
