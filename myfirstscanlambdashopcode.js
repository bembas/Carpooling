exports.handler =  function(event, context, callback) {
    // TODO implement
    var AWS = require("aws-sdk");
    var allShops = [];
   
    AWS.config.update({
        region:"eu-west-3"
    });
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    console.log("Scaning Data dynamodb...");
    
    var params = {
        TableName : "Shop"
    };
 
    docClient.scan(params , onScan);

    function onScan(err,data){
        if (err) {
            console.error("Unable to scan !" + JSON.stringify(err,null,2));
        } else {
             data.Items.forEach(function(shop){
                  allShops.push(shop);
             });
            callback(null, allShops);
        }
            
   }

};
