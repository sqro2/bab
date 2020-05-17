var bittrex = require("./bittrex.js");
var indicator = {
    init : function(){
           
    },
    
    hour_24_diff : function(callback){
        var curr = null;
        var counter = 0;
        var diff = 0;
        var $this = this;
        bittrex.getmarketsummaries(function(data,err){
            if(err){
                console.log("err")
            }else{
                curr = data.result;
                for(counter=0;counter<curr.length;counter++){
                    if(curr[counter].MarketName == "USDT-BTC" || curr[counter].MarketName == "USDT-BCC" || curr[counter].MarketName == "USDT-BTG"){
                        continue;
                    }

                    var h_24_diff = (curr[counter].High/curr[counter].Ask);

                    var temp = {
                        market : curr[counter].MarketName,
                        diff : h_24_diff
                    }
                    $this.extras.h_24_diff_tuples[counter] = temp;
                }
                callback($this.extras.h_24_diff_top())
               
            }
        })


    },
    
    extras : {
        h_24_diff_tuples : [],
        h_24_diff_tuples_top : [],
        h_24_diff_top : function(){
            var tempData = this.h_24_diff_tuples;
            var i,j,k = 0;
            var market = " ";
            var tempArray = [];
            for (i=0;i<10;i++){
                  var big = 0;
                  for (j=0;j<tempData.length;j++){
                        if(tempData[j] && tempData[j].diff>big){
                                     /*console.log(tempData.length)*/
                                     big=tempData[j].diff;
                                     market = tempData[j].market;
                                     tempData.splice(j,1);

                        }
                  }
                var tuples_top = {
                       market : market,
                       diff : big,
                };
                this.h_24_diff_tuples_top[i] = tuples_top;
            }
            return this.h_24_diff_tuples_top;
        },
        in_array : function(array,para){
              /*console.log(array+" : "+para)*/
              var i = 0;
              for(i=0;i<array.length;i++){
                  if(array[i]==para){
                      return true;
                  }else{
                      return false;
                  }
              }
        }
    }
}

module.exports = indicator;