var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var dbName = "sentimentAnalysisDB";

addCollection = (collectionName, cb) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.createCollection(collectionName, function (err, res) {
            if (err) {
                cb(err, false);
                throw err;
            }
            else {
                console.log("Collection created!");
                cb(null, true);
            }
            db.close();
        });
    });
}

addDocumentToCollection = (collectionName, doc, cb) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).insertOne(doc, function (err, res) {
            if (err) {
                cb(err, false);
                throw err;
            }
            else {
                console.log("1 document inserted");
                cb(null, true);
            }
            db.close();
        });
    });
}

findDocumentInCollection = (collectionName, doc, cb) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).findOne(doc, function (err, result) {
            db.close();
            if (err) {
                cb(err, null);
                throw err;
            }
            else if (result) {
                cb(null, result);
            }
            else {
                cb(null, {});
            }
        });
    });
}

findMultipleDocumentsInCollection = (collectionName, doc, cb) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).find(doc).toArray(function (err, result) {
            db.close();
            if (err) {
                cb(err, null);
                throw err;
            }
            else if (result) {
                cb(null, result);
            }
            else {
                cb(null, []);
            }
        });
    });
}

executeQuery = (collectionName, query, cb) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).find(query).toArray(function (err, result) {
            db.close();
            if (err) {
                cb(err, null)
                throw err;
            }
            else if (result) {
                cb(null, result);
            }
            else {
                cb(null, []);
            }
        });
    });
}

updateDocument = (collectionName, query, doc, cb) => {
    try {
        MongoClient.connect(dbUrl, function (err, db) {
            if (err) {
                console.log(err);
                throw err
            };
            var dbo = db.db(dbName);
            dbo.collection(collectionName).update(query, { $set: doc }, { upsert: true, safe: false }, function (err, res) {
                if (err) {
                    console.log(err);
                    cb(false);
                }
                cb(true);
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}

addChannelToUsers = (collectionName, channelName, guidList, cb) => {
    try {
        var guidsInDB = [];
        MongoClient.connect(dbUrl, function (err, db) {
            if (err) {
                console.log(err);
                throw err
            };
            var dbo = db.db(dbName);

            dbo.collection(collectionName).find({ guid: { $in: guidList } }).project({ 'guid': 1, _id: 0 }).toArray(function (err, result) {
                if (err) {
                    throw err;
                }

                else if (result) {
                    for (user of result) {
                        guidsInDB.push(user.guid.toLowerCase());
                    }
                }
                guidList = guidList.filter(function (e) { return !guidsInDB.includes(e) });
                for (let i = 0; i < guidList.length; i++) {
                    guidList[i] = { guid: guidList[i], channelList: [channelName] };
                    console.log(guidList[i]);
                }
                dbo.collection(collectionName).updateMany({ guid: { $in: guidsInDB } }, { $push: { channelList: channelName } }, { upsert: false, multi: true }, function (err, res) {
                    if (err) {
                        console.log(err);
                        console.log("update many failed");
                        cb(false);
                    }
                });
                if (guidList.length > 0) {
                    dbo.collection(collectionName).insert(guidList, function (err, res) {
                        if (err) {
                            console.log(err);
                            cb(false);
                        }
                        else {
                            cb(true);
                        }
                        db.close();
                    });
                }
                else
                    cb(true);
            });

        });
    }
    catch (e) {
        console.log(e);
    }
}

// addCollection("test", function (err, res) {
//     console.log(res);
// });

// executeQuery("users", {guid : "testing4"}, function (err, res) {
//     if (!err) {
//         console.log(res);
//     }
//     else {
//         console.log("Error occured\n" ,err);
//     }
// });

module.exports = {
    addCollection: addCollection,
    addDocumentToCollection: addDocumentToCollection,
    findDocumentInCollection: findDocumentInCollection,
    findMultipleDocumentsInCollection: findMultipleDocumentsInCollection,
    executeQuery: executeQuery,
    updateDocument: updateDocument,
    addChannelToUsers: addChannelToUsers
};