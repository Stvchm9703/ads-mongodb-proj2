// this is "client-side" ipc-client ipc request 
// bind to 

// https://blog.hinablue.me/vuex-vuex-de-wu-shi-dao-yin-ying/
// https: //blog.hinablue.me/vuejs-vuex-2-0-guan-yu-plugins-de-shi-qing/
import DBConnect from "./db.js";

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
        let y = await DBserver.CheckModel();
        if (y.error) {
            return Promise.reject(y.error);
        }
        else {
            return y;
        }
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

// DB server 
var conn = {
    host: "localhost",
    port: 27017,
    dbName: "scope_ADS"
};

var DBserver = null;

var InitDB = async () => {
    DBserver = new DBConnect();
    DBserver.Connect(conn).then((result) => {
        console.log('connection');
        console.trace(result);
        return result;
    }, (err) => {
        console.log("-----");
        console.log('hi, your server is not connected');
        console.warn(err);
        return new Promise.reject(err);
    });
};

var CloseDB = async () =>{
    return DBserver.Disconnect();
};

var _plugin_onInit = async (store) => {
    console.log(store);
    // init db
    await InitDB();
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

      
    };
}

export default {
    BaseState,
    BaseGetter,
    BaseAction,
    fetchUserData
};