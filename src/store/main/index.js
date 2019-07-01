import ipcApiClient from '@/plugin/ipcApiClient.js';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import model from './model.json';
// import cdw from 'lodash/cloneDeepWith'

let mod_struct = Object.assign({}, model.$struct);

for (var kry in mod_struct) {
    mod_struct[kry] = {};
}

let state = {
    ...ipcApiClient.BaseState,
    template: model,
    struct : mod_struct
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};