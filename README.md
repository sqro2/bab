# Bittrex assistant bot

## Installation : 

step 1 : install dependencies by running "npm i"

step 2 : import api key and secret to conf.json file

step 3 : run commands from terminal


## Availble Commands :


###### node app q bal [args]

usage : this command is for retriving wallet balance. replace args with "coin_id" for quering balence of specific currency or "all" for retriving all the balance 

example : node app q btc 



###### node app q top red 

usage : this command is used for retriving the top 10 coins with highest retracements relative to their 24h highs.


###### node app buy instant [args]

usage : this command is used for panic buy a coin (buy the lowest ask instantly). Args contains market-currency pair.

example : node app buy instant btc-fuel
example : node app buy instant eth-fuel


###### node app sell instant [args]

usage : this command is used for panic sell a coin (sell to the highest bit instantly). Args contains market-currency pair.

example : node app sell instant btc-fuel
example : node app sell instant eth-fuel



###### node app buy highest-bid [args]

usage : this command is used for buy a coin at the current highest bid price. Args contains market-currency pair.

example : node app buy highest-bid btc-fuel



###### node app sell lowest-ask [args]

usage : this command is used for sell a coin at the current lowest ask price. Args contains market-currency pair.

example : node app sell lowest-ask btc-fuel







