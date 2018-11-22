exports.handler =  function(event, context, callback) {
    
  
   var AWS = require("aws-sdk");
   var id = event.id;

   
   
   
    AWS.config.update({
        region:"eu-west-3"
    });
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var paramsupdate = {
        TableName : "Routes",
        Key : {
            "id" : id
        },
        UpdateExpression: "set available_seats = available_seats - :as , isActive = :isActiveVal",
        ConditionExpression: "available_seats > :ascheck and id = :idval and isActive <> :isActiveVal",
        ExpressionAttributeValues:{
            ":as": 1,
            ":ascheck" : 0,
            ":idval" : id ,
            ":isActiveVal": false
        }
    };
 

    console.log("Updating the item...");
    
    docClient.update(paramsupdate, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:"+JSON.stringify(data, null, 2));
            callback(null,data);
        }
    });

};
