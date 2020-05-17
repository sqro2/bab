var bittrex = require("./bittrex.js");
var misc = {
    getBal : function(curr,callback){
             var $that = this;
             bittrex.getbalances(function(data,err){
                 if(err){
                     console.log(err);
                 }else{
                     callback($that.extras.resolveBal(data["result"],curr));
                 }
             })
    },
    extras : {
        resolveBal : function(data,curr){
             var i;
             var balArray = [];
             for(i=0;i<data.length;i++){
                 if(data[i].Balance>0){
                    var temp = {
                        currency : data[i].Currency,
                        bal : data[i].Balance,
                    }
                     switch(curr){
                         case "all":
                             balArray.push(temp);
                             break;
                         default:
                             if(data[i].Currency.toLowerCase()==curr.toLowerCase()){
                                 balArray.push(temp);
                             }
                     }
 
                    
                 }
             }
            return balArray;

        }
    }
}

module.exports = misc;