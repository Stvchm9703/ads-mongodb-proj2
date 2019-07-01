'use strict';
import {
    ipcMain,
} from 'electron';

import DBConnect from "./db.js";
// import isEqual from 'lodash/isEqual';


var conn = {
    host: "localhost",
    port: 27017,
    dbName: "scope_ADS"
};

// this is "server-side" listen to ipc 
var InitChannel = (function() {
return function() {
    let ipcHub = ipcMain;
    ipcHub.on('log', (e, arg) => {
        console.log('log:');
        e.returnValue = 'ok';
    });
    // try to conn to DB 
    var dbConn = new DBConnect();
    dbConn.Connect(conn).then((result) => {
        console.log('connection');
        console.trace(result);
        // if (result.server && result.db) {
        //     console.log("db/InitConn:", true);
        //     ipcHub.emit('db/InitConn', true);
        // } else {
        //     console.log("db/InitConn:", false);
        //     ipcHub.emit('db/InitConn', false);
        // }
    }, (err)=>{
        console.log("-----")
        console.log('hi, your server is not connected');
        console.warn(err);
    });

    ipcHub.on('log1', (e, arg) => {
        console.log('log1:', arg);
        e.returnValue = 'ok1';
    });
    ipcHub.on('db/checkModel', (e, arg) => {
        // model.template === arg
        // dbConn[arg.name].findOne()
        console.log(e);
        console.log('----');
        console.log("db/checkModel ::", arg);        
        dbConn.CheckModel(arg)
            .then((r) => {
                console.log("check")
                e.returnValue = r;
            }, (err)=>{
                console.log('check-mod :cb');
                console.log(err.error);
                e.returnValue = {err};
            });
    });
    ipcHub.on('db/createModel', (e, arg) => {
        // model === arg
        // dbConn[arg.name].findOne()
        console.log(arg);
        dbConn.db.CreateModel(arg)
            .then((r) => {
                e.returnValue = r;
            })
            .catch((err) => {
                e.returnValue = err;
            });
    });

};
})();


export default {
    InitChannel
};