exports.handler =  function(event, context, callback) {
   
   
    var AWS = require("aws-sdk");
    var UUID = require('uuid');
   
    AWS.config.update({
        region:"eu-west-3"
    });
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    console.log("Scaning Data dynamodb...");
    
    console.log("UUID "+ UUID.v1());
    var params = {
        TableName : "Routes",
        Item :{
            "id" : UUID.v1(),
            "destination":event.destination,
            "available_seats": event.available_seats
        }
    };
 
    docClient.put(params , onPost);

    function onPost(err,data){
        if (err) {
            console.error("Unable to post!" + JSON.stringify(err,null,2));
        } else {
            console.log(data);
        }
            
   }


    callback(null, "Done");
};
