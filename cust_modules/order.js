var bittrex = require("./bittrex.js");

var order = {
    buy : function(params){
           switch(params[0]){
               case "instant":
                   this.makeTrade.buyLowestAsk(params[1])
                   break;
               case "highest-bid":
                     this.makeTrade.buyHighestBid(params[1])
                     break;
               default:
                    console.log("invalid arguments");
                   
           }
    },
    sell : function(params){
           switch(params[0]){
               case "instant":
                   this.makeTrade.sellHighestBid(params[1])
                   break;
               case "lowest-ask":
                     this.makeTrade.sellLowestAsk(params[1])
                     break;
               default:
                    console.log("invalid arguments");
                   
           }
    },
    
    makeTrade :{
         
         buyHighestBid : function(market){
             var $that = this;
             this.getbalance("btc",function(bal){
                 $that.getMarket(market,function(data){
                 var quan = (bal/data.Ask)-((bal/data.Ask)*0.0025);
                 var req = "https://bittrex.com/api/v1.1/market/buylimit?apikey=72647caad8224897be9a3627b3202114&market="+data.MarketName+"&quantity="+quan+"&rate="+data.Bid;

                 bittrex.sendCustomRequest(req,function(data,err){
                     if(err){
                         console.log(err)
                     }else{
                         console.log(data)
                     }
                 },true)
                 })                 
                 
             }) 
             
         },
         buyLowestAsk : function(market){
             var $that = this;
             this.getbalance("btc",function(bal){
                 $that.getMarket(market,function(data){
                 var quan = (bal/data.Ask)-((bal/data.Ask)*0.0025);
                 var req = "https://bittrex.com/api/v1.1/market/buylimit?apikey=72647caad8224897be9a3627b3202114&market="+data.MarketName+"&quantity="+quan+"&rate="+data.Ask;

                 bittrex.sendCustomRequest(req,function(data,err){
                     if(err){
                         console.log(err)
                     }else{
                         console.log(data)
                     }
                 },true)
                 })                 
                 
             }) 
         },
         sellHighestBid : function(market){
             var $that = this;
             var curr_id = market.split("-");
             this.getbalance(curr_id[1],function(bal){
                 $that.getMarket(market,function(data){
                 var quan = bal;
                 var req = "https://bittrex.com/api/v1.1/market/selllimit?apikey=72647caad8224897be9a3627b3202114&market="+data.MarketName+"&quantity="+quan+"&rate="+data.Bid;

                 bittrex.sendCustomRequest(req,function(data,err){
                     if(err){
                         console.log(err)
                     }else{
                         console.log(data)
                     }
                 },true)
                 })                 
                 
             })           
         },
         sellLowestAsk : function(market){
             var $that = this;
             var curr_id = market.split("-");
             this.getbalance(curr_id[1],function(bal){
                 $that.getMarket(market,function(data){
                 var quan = bal;
                 var req = "https://bittrex.com/api/v1.1/market/selllimit?apikey=72647caad8224897be9a3627b3202114&market="+data.MarketName+"&quantity="+quan+"&rate="+data.Ask;

                 bittrex.sendCustomRequest(req,function(data,err){
                     if(err){
                         console.log(err)
                     }else{
                         console.log(data)
                     }
                 },true)
                 })                 
                 
             })             
         },
        getMarket : function(market,callback){
                bittrex.getmarketsummary({market:market.toUpperCase()},function(data,err){
                    if(err){
                        console.log(err)
                    }else{
                        callback(data.result[0]);
                    }
                })
         },
        getbalance : function(currency,callback){
            bittrex.getbalances(function(data,err){
                if(err){
                    console.log(err)
                }else{
                    var i = 0;
                    for(i=0;i<data.result.length;i++){
                        if(data.result[i].Currency==currency.toUpperCase()){
                            
                            callback(data.result[i].Available);
                            break;
                            
                        }else{
                            
                        }
                    }
                }
            })
        }
    }
    
}

module.exports = order;