var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var dbName = "bank";

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
                cb(err,null)
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

// addCollection("test", function (err, res) {
//     console.log(res);
// });

executeQuery("users", {guid : "chirmish"}, function (err, res) {
    if (!err) {
        console.log(res);
    }
    else {
        console.log("Error occured");
    }
});

module.exports = {
    addCollection : addCollection,
    addDocumentToCollection : addDocumentToCollection,
    findDocumentInCollection : findDocumentInCollection,
    findMultipleDocumentsInCollection : findMultipleDocumentsInCollection,
    executeQuery : executeQuery
};