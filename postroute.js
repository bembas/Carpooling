exports.handler =  function(event, context, callback) {
   
   var allroutes = [];
    var AWS = require("aws-sdk");
   
   
    AWS.config.update({
        region:"eu-west-3"
    });
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    console.log("Scaning Data dynamodb...");
    
 
    var params = {
        TableName : "Routes"
    };
 
    docClient.scan(params , onPost);

    function onPost(err,data){
        if (err) {
            console.error("Unable to post!" + JSON.stringify(err,null,2));
        } else {
             data.Items.forEach(function(route){
                  allroutes.push(route);
             });
             
             callback(null, allroutes);
        }
            
   }



};
