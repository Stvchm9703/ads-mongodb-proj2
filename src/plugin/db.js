import {
    MongoClient
} from 'mongodb';
import keymap from './keymap.json';
// import {reject} from Promise;
/**
 * common connection with setting
 */

var conn = {
    host: "localhost",
    port: 27017,
    dbName: null
};

const connUrl = (_c) => {
    if (!_c)
        return "mongodb://" + conn.host + ":" + conn.port;
    else
        return "mongodb://" + _c.host + ":" + _c.port;
};

/* eslint-disable */
const createVaildator = (md) => {
    let Schema = {
        bsonType: "object",
        properties: md.$struct
    };
    return Schema;
};
/* eslint-enable */
export default class DBClass {
    constructor() {
        this.server;
        this.db;
        this.keymap;
    }
    async Connect(_conn) {
        console.log('connect db', _conn);
        let str = connUrl(_conn);
        this.server = new MongoClient(str, {
            useNewUrlParser: true,
            keepAlive: 60000,
        });
        let connRe = await this.server.connect();
        if (connRe) {
            console.log(_conn.dbName);
            this.db = await this.server.db(_conn.dbName);
            let coll = await this.db.collections();
            coll = coll.filter(c => c.collectionName === '_key_map');
            if (coll.length === 1) {
                this.keymap = await this.db.collection('_key_map');
                return {
                    db: this.db,
                    server: this.server,
                    keymap: this.keymap,
                };
            } else {
                throw ({
                    error: 'ERR_MISSING_KEYMAP',
                    db: this.db,
                    server: this.server,
                    keymap: this.keymap,
                });
            }
        } else {
            console.log(conn);
            throw ({});
        }
    }

    async Disconnect() {
        if (this.db) {
            await this.db.close();
        }
        await this.server.close();
        return true;
    }

    async initKeyMap() {
        if (this.db) {
            return this.db.createCollection(keymap.$info.name, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        properties: keymap.$struct
                    }
                }
            });
        } else {
            throw ({
                error: 'ERR_DB_CONN_ERR',
                db: this.db
            });
        }
    }


    async CheckModel(md) {
        if (this.db) {
            let coll = await this.db.collections();
            coll = coll.filter(c => c.collectionName === md.$info.name);
            console.log(coll);

            // .find();

            let keymap = await this.db.collection('_key_map').find({
                'namespace': md.$info.name
            });
            console.log(keymap);
            if (coll.length === 1 && keymap) {
                return keymap.buildInfo;
            } else if (coll.length === 1 && !keymap) {
                console.warn('buildInfo keymap missing');
                throw {
                    error: 'ERR_COLL_NO_KEYMAP',
                    keymap
                }
            } else if (coll.length !== 1 && keymap) {
                throw {
                    error: 'ERR_COLL_BUILD_MISSING'
                }
            } else {
                throw ({
                    error: 'ERR_COLL',
                    collection: coll
                });
            }
        } else {
            throw ({
                error: 'ERR_DB_CONN_ERR',
                db: this.db
            });
        }
    }

    async CreateModel(md) {
        console.log('create model process')
        console.log(this.db);
        if (this.db) {
            let coll = await this.db.collections();
            coll = coll.filter(c => c.collectionName === md.$info.name);
            if (coll.length !== 0) {
                throw ({
                    error: 'ERR_COLL_EXIST'
                });
            } else {
                // not exist 
                let struction = Object.assign({}, md.$struct);
                let struct_key = [];
                let n_struct = {};
                Object.keys(md.$struct).forEach((e) => {
                    // console.log(struction[e]);
                    let tmp = Object.assign({}, struction[e]);
                    delete tmp.required;
                    delete tmp.sample;
                    n_struct[e] = tmp;
                    if (struction[e].required) {
                        struct_key.push(e);
                    }
                });
                let options = {
                    ...md.$struct.options,
                    required: struct_key
                }
                console.log(options);
                this.db.createCollection(md.$info.name, {
                    validator: {
                        $jsonSchema: {
                            bsonType: "object",
                            properties: n_struct,
                            ...options
                        }
                    }
                }).then(() => {
                    // success create 
                    // insert the key maping
                    return this.db.collection("_key_map").insertOne({
                        "namespace": md.$info.name,
                        "buildInfo": md
                    });
                }, (err) => {
                    throw {
                        error: "ERR_COLL_CREATE_FAIL",
                        msg: err
                    }
                });
                // console.log(result);

            }
        } else {
            throw ({
                error: 'ERR_DB_CONN_ERR'
            });
        }
    }

    async CreateRecord(md_name, rec) {
        if (this.db) {
            let coll = await this.db.getCollectionInfos({
                name: md_name
            });
            if (coll.length === 1) {
                return this.db.collection(md_name).insertOne(rec);
            } else {
                throw ({
                    error: 'ERR_COLL_NOT_EXIST'
                });
            }
        } else {
            throw ({
                error: 'ERR_DB_CONN_ERR'
            });
        }
    }
}