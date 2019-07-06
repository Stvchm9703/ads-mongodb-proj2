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
        return DBserver.CheckModel(model);
    } else {
        throw {
            error: 'ERR_MOD_NULL',
            msg: model
        };
    }
};

/* eslint-disable */
/* eslint-enable */
var _createModel = (model) => {
    // add checker
    if (model && model.$info && model.$struct) {
        DBserver.CreateModel(model).then(() => {
            // success, test insert 
            let struct = Object.assign({}, model.$struct);
            let sample_obj = {};
            Object.keys(struct).forEach((e) => {
                sample_obj[e] = struct[e].sample;
            });
            return DBserver.CreateRecord(model.$info.name, sample_obj);
        }, (err) => {
            throw err;
        });

    } else {
        throw {
            error: 'ERR_MOD_NULL',
            model,
        }
    }
};


var _initModel = async (module, payload) => {
    console.log("call _init Model");
    console.log(module.state.template);
    _checkModel(module.state.template).then((r) => {
        return r.model;
    }, (err) => {
        console.warn(err);
        return _createModel(module.state.template);
    });
};

var _saveToDB = async (model, payload) => {};


var BaseAction = {
    _getModelKey,
    _checkModel,
    _initModel,
    _saveToDB,
};


var DBserver = null;

var InitDB = async (conn) => {
    DBserver = new DBConnect();
    return DBserver.Connect(conn);
};
/* eslint-disable */
var CloseDB = async () => {
    return DBserver.Disconnect();
};
/* eslint-enable */
var _plugin_onInit = async (store, conf) => {
    console.log(store);
    // init db
    InitDB(conf).then((e) => {
        console.log(e);
        let store_act = Object.keys(store._actions);
        let init_call = store_act.filter(key => key.indexOf('_initModel') > -1);
        init_call.forEach(callee => {
            console.log('call to :', callee);
            store.dispatch(callee);
        });
    });
};
/* eslint-disable */
var _plugin_onDestroy = async (store) => {
    return await CloseDB();
};
/* eslint-enable */

// Vuex Plugin 
function fetchUserData(conf) {
    return store => {
        // init 
        _plugin_onInit(store, conf);
    };
}

export default {
    BaseState,
    BaseGetter,
    BaseAction,
    pluginOnDestroy: _plugin_onDestroy,
    fetchUserData
};