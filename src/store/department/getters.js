import ipcApiClient from '@/plugin/model.js';

export default {
    ...ipcApiClient.BaseGetter,
    exportModel: (m) => ({
        name :  "1"
    }),
    
};