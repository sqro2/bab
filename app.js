
var crypto = require("crypto");
const cReader = require("./cust_modules/cReader.js");

var app = {
    init : function(){
        cReader.init();
    }
}

app.init();
