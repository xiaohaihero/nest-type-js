import * as cryptoJs from 'crypto-js'
let config = require('config');

module.exports = str => {
    return cryptoJs.HmacMD5(str, config.secret)
}

