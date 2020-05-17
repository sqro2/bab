var bittrex = require("node-bittrex-api");
const conf = require("./conf.json")


bittrex.options({
    "apikey" : conf.api.key,
    "apisecret" : conf.api.secret,
});

module.exports = bittrex;
