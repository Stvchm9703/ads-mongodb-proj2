// this is "client-side" ipc-client ipc request 
// bind to 

// https://blog.hinablue.me/vuex-vuex-de-wu-shi-dao-yin-ying/
// https: //blog.hinablue.me/vuejs-vuex-2-0-guan-yu-plugins-de-shi-qing/

import {
    ipcRenderer
} from 'electron';




var BaseState = {
    _coll_name: "",
    _page_num: 0,
    _page_limit: 20,
    _sort_by: [],
    _collection: [],
    _index_point: 0,
    template: {}
};

var _getCurrentColl = (state) => {
    if (state['_collection'].length > state['_index_point'] + 1) {
        return state['_collection'][state['_index_point']];
    } else {
        return null;
    }
};

var _getCollProps = (state) => {
    if (state['_collection'].length > 0) {
        let temp = state['_collection'][0];
        return Object.keys(temp);
    } else {
        return [];
    }
};


var BaseGetter = {
    _getCurrentColl,
    _getCollProps
};

var _getModelKey = (model) => {
    let state = model['state'];
    console.log(state);
    if (state['_collection'].length > 0) {
        let temp = state['_collection'][0];
        return Object.keys(temp);
    } else {
        return [];
    }
};
var _checkModel = async (model) => {
    console.log(model);
    // let timeout = 
    if (model) {
        let y  = await ipcRenderer.sendSync('db/checkModel', model);
        // setTimeout(() => {
        console.log(y);
        // }, 5000);
        // .then(result => {
        //     console.warn(result);
        //     return result;
        // }, err=>{
        //     console.warn(err);
        //     return err;
        // });
        return y;
    } else {
        return Promise.reject( new Error({
            error : 'ERR_MOD_NUL',
            msg : model
        }));
    }
};
var _initModel = async (module, payload) => {
    console.log("call _init Model");
    console.log(module.state.template);
    // start checking
    let result = await _checkModel(module.state.template);
    console.log(result);
    // if (result.error) {
    //     console.warn(result.error);
    //     return _createModel(module.state.template);
    // }
    // else {
    //     return result.model;
    // }

};
var _saveToDB = async (model, payload) => {

};
var _createModel = (model) => {};

var BaseAction = {
    _getModelKey,
    _checkModel,
    _initModel,
    _saveToDB,
    // _fetchModel,
};


var _plugin_onInit = async (store) => {
    console.log(store);
    let store_act = Object.keys(store._actions);
    let init_call = store_act.filter(key => key.indexOf('_initModel') > -1);
    init_call.forEach(callee => {
        store.dispatch(callee);
    });
};

var _plugin_onDestory = async (store) => {

};
// Vuex Plugin 
function fetchUserData() {
    return store => {
        // init 
        _plugin_onInit(store);

        // store.subscribe((mutation, state) => {
        //     console.log("call fm subscrible")
        //     console.log(mutation);
        // //     // if (mutation.type === 'router/ROUTE_CHANGED') {
        // //     //     // 由於 Vue-Router 會觸發 ROUTE_CHANGED
        // //     //     // 所以我們只在這個時候作一次，避免重複被觸發
        // //     //     store.dispatch('fetchUserData')
        // //     // }
        // });
    };
}

export default {
    BaseState,
    BaseGetter,
    BaseAction,
    fetchUserData
};