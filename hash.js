const crypto = require('crypto');

encrypt = (text,cb) => {
    let cipher = crypto.createCipher('aes-256-ecb', 'password');
    let res = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    cb(res);
}

decrypt = (code,cb) => {
    let decipher = crypto.createDecipher('aes-128-cbc', 'password');
    let res = decipher.update(code, 'hex', 'utf8') + decipher.final('utf8');
    cb(res);
}

module.exports = {
    "encrypt" : encrypt,
    "decrypt" : decrypt
}