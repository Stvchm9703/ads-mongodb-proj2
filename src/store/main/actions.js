import ipcApi from '@/plugin/ipcApiClient.js';

var Action = {
    ...ipcApi.BaseAction,
    async getMainProcess(m , payload){
        console.log(Action);
        console.log("bye from Main/Action");
        return null;
    },
   
};


// Action.prototype = Object.assign(Action.prototype, BaseAction)

export default Action;
