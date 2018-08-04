var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var dbName = "testDB";
var mongo = require('mongodb');

function updateQty(prodList) {
    // item : { "id" : objId , "stock" : stock}
    let query = prodList.map(function (item, index, arr) {
        return {
            "updateOne": {
                "filter": {
                    "_id": item.id
                },
                "update": { "$inc": { "stock": parseInt(item.stock) } }
            }
        }
    });
    console.log(query);

    stocks = prodList.map(function (item, index, arr) {
        return item.stock;
    });

    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log(err);
            throw err
        };
        var dbo = db.db(dbName);
        dbo.collection("products").bulkWrite(query, function (err, r) {
            if (err)
                throw err;
            else {
                console.log(r.matchedCount);
                console.log(r.modifiedCount);
            }
        })
    });
}

findDocumentInCollection = (doc) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection("products").find(doc).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            else if (result) {
                console.log(result);
            }
            else {
            }
            db.close();
        });
    });
}
//findDocumentInCollection({"_id" : mongo.ObjectId("5b615150be91d3961e3612db")});
updateQty([{ "id": mongo.ObjectId("5b615150be91d3961e3612db"), stock: 50 }, { "id": 1, stock: 25 }]);