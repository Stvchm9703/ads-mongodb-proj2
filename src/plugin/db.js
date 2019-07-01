import {
    MongoClient
} from 'mongodb';
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

const createVaildator = (md) => {
    let Schema = {
        bsonType: "object",
        properties: md.$struct
    };


    return Schema;

};

export default class DBClass {
    constructor() {
        this.server;
        this.db;

    }
    async Connect(_conn) {
        let str = connUrl(_conn);
        this.server = new MongoClient(str, {
            useNewUrlParser: true
        });
        let connRe = await this.server.connect();
        if (connRe) {
            return {
                server: this.server,
                db: this.db
            };
        } else {
            return new Promise.reject(err);
        }
    }

    async Disconnect() {
        return this.server.close();
    }

    async CheckModel(md) {
        console.log('touch');
        if (this.db) {
            let coll = await this.db.getCollectionInfos({
                name: md.$info.name
            });
            if (coll.length === 1) {
                let sample = await this.db.collection(md.$info.name).findOne();
                let tmp = Object.keys(sample).map(e => ({
                    key: e,
                    type: typeof e
                }));
                return {
                    model: tmp
                };
            } else {
                return new Promise.reject(new Error({
                    error: 'ERR_COLL',
                    collection: coll
                }));
            }
        } else {
            return new Promise.reject(new Error({
                error: 'ERR_DB_CONN_ERR'
            }));
        }
    }

    async CreateModel(md) {
        if (this.db) {
            let coll = await this.db.getCollectionInfos({
                name: md.$info.name
            });
            if (coll.length !== 0) {
                throw new Error({
                    error: 'ERR_COLL_EXIST'
                });
            } else {
                // not exist 
                this.db.createCollection(md.$info.name, {
                    validator: {
                        $jsonSchema: {
                            bsonType: "object",
                            properties: md.$struct
                        }
                    }
                }).then((r) => {
                    return r;
                }).catch(e => {
                    return new Promise.reject(new Error({
                        error: 'ERR_COLL',
                        msg: e
                    }));
                });
            }
        } else {
            return new Promise.reject(new Error({
                error: 'ERR_DB_CONN_ERR'
            }));
        }
    }

    async CreateRecord(md_name, rec) {
        if (this.db) {
            let coll = await this.db.getCollectionInfos({
                name: md_name
            });
            if (coll.length === 1) {
                let rec = this.db.collection(md_name).insertOne(rec)
                    .then((result) => {
                        return result;
                    })
                    .catch((e) => {
                        return new Promise.reject(new Error({
                            error: 'ERR_INSERT_REC',
                            msg: e
                        }));
                    });
            } else {
                return new  Promise.reject(new Error({
                    error: 'ERR_COLL_NOT_EXIST'
                }));
            }
        } else {
            return new Promise.reject(new Error({
                error: 'ERR_DB_CONN_ERR'
            }));
        }
    }
}