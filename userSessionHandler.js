var db = require('./db');
var hash = require('./hash');
var salt = "abc";

addUserSession = (guid,timestamp) => {
    hash.encrypt(guid+salt+timestamp, function(hashValue){
        let userObject = {
            guid : guid,
            hashValue : hashValue,
            channelList : []
        };
        db.addDocumentToCollection("users",userObject,function(err,res) {
            if(err)
                throw err;
            else {
                return res;
            }
        });
    });
}

addUserSession("chirmish", (new Date()).getMilliseconds);