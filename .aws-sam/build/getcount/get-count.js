"use strict"
const AWS = require("aws-sdk"); //We need to get the necessary properties and functions from the aws-sdk.
//and in order to do that we save it into the AWS constant.

AWS.config.update({ region: "us-east-1" }); //Specify aws region

exports.handler = async () => {

const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const params = {
    TableName: "tracking",
    Key: {
        'stats': 'view-count'
    },
    AttributesToGet: ['Quantity']
};
var statusCode;
var body;
try {
    const data = await documentClient.get(params).promise();
    console.log(JSON.stringify(data));
    console.log(data['Item']['Quantity']);
    body = data['Item']['Quantity'];
    statusCode = 200;

} catch(err) {
    console.log(err);
    statusCode = 400;
    body = JSON.stringify(err.message);
}
return {
        'statusCode': statusCode,
        'headers': {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "https://www.mitchbounds.com",
          "Access-Control-Allow-Methods": "GET"
        },
        'body': body
}
};
