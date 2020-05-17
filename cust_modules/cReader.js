var args = process.argv.slice(2);
var order = require("./order.js")
var indicators = require("./indicators.js");
var misc = require("./misc.js");


var cReader = {
    init : function(){
        if(args.length<=2){
            this.terminate("< Error : Invalid Arguments >")
        }else{
           this.parseQ(args)  
        }
        
    },
    isValid : function(args){
        if(args.length>=2){
            return true;
        }else{
            return false;
        }
    },
    parseQ : function(){
         var cmd = args[0].toLowerCase();
         if(cmd=="q"){
             if(args[2]){
                 var params = [args[1].toLowerCase(),args[2].toLowerCase()];
             }else{
                 var params = [args[1].toLowerCase()];                 
             }
         }else{
             var params = [args[1].toLowerCase(),args[2].toLowerCase()];
         }
         
          
         switch(cmd){
             case "buy":
                  order.buy(params);
                  break;
             case "sell":
                  order.sell(params);
                  break;
             case "q" :
                  this.processQ(params);
                  break;
             default:
                 this.terminate("invalid arguments")
         }
         
    },
    processQ : function(params){
         switch(params[0]){
             case "top":
                 indicators.hour_24_diff(function(result){
                     console.log(result)
                 });
                 break;
             case "bal":
                 misc.getBal(params[1],function(result){
                     console.log(result);
                 })
                 
         }
        
    },
    terminate : function(msg){
           console.log(msg);
           process.exit(1); 
        
    }
}

module.exports = cReader;
