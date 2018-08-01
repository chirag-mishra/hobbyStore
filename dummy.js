var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";
var dbName = "testDB";

function updateQty(prodList) {

    idList = prodList.map(function(item,index,arr) {
        return item.id;
    });

    stocks = prodList.map(function(item,index,arr) {
        return item.stock;
    });

    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            console.log(err);
            throw err
        };
        var dbo = db.db(dbName);
        let i=0;
        dbo.collection("products").update({"_id" : {$in : idList}}, { $inc : {stock : stocks[i++]} }, { upsert: false,multi : true, safe: false }, function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);
        });
    });
}

findDocumentInCollection =  (doc) => {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection("products").find(doc).toArray(function (err, result){
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
//findDocumentInCollection({"_id" : 2});
updateQty([{"id" : 2, stock : 50}, {"id" : 1, stock : 35}]);