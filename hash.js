const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'key');
const decipher = crypto.createDecipher('aes192', 'key');

encrypt = (text,cb) => {
    let encrypted = '';
    cipher.on('readable', () => {
        const data = cipher.read();
        if (data)
            encrypted += data.toString('hex');
    });
    cipher.on('end', () => {
        cb(encrypted);
        // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
    });

    cipher.write(text);
    cipher.end();
}



decrypt = (code,cb) => {
    let decrypted = '';
    decipher.on('readable', () => {
        const data = decipher.read();
        if (data)
            decrypted += data.toString('utf8');
    });
    decipher.on('end', () => {
        cb(decrypted);
        // Prints: some clear text data
    });

    decipher.write(code, 'hex');
    decipher.end();
}

module.exports = {
    "encrypt" : encrypt,
    "decrypt" : decrypt
}