const aws = require('aws-sdk');
const dynamoDb = new aws.DynamoDB();

const tableName = process.env.USERTABLE;

exports.handler = async (event) => {
  /**
   * To save the new user to DynamoDB
   * 
   * Event contains:
   *    event.request
   *        .userAttributes(
   *                    email: string, 
   *                    email_verified, bool, 
   *                    phone_number: int, 
   *                    phone_number_verified: bool, 
   *                    sub: unique_id
   *                    )
  */

  if ( !event?.request?.userAttributes?.sub ){
    console.log("No sub exists!");
    return;
  }

  const now = new Date();
  const timeStamp = now.getTime();

  const userItem = {
    id: { S: event.request.userAttributes.sub },
    __typename: { S: 'User' },
    _lastChangedAt: { N: timeStamp.toString() },
    version: { N: "1" },
    updatedAt: { S: now.toISOString() },
    createdAt: { S: now.toISOString() },
    name: { S: event.request.userAttributes.email },
  }

  const param = {
    Item: userItem,
    TableName: tableName,
  };

  //save user name to the DB
  try{
    dynamoDb.putItem(param).promise();
    console.log("User Added Successfully");
  } catch(e){
    console.log(e);
  }
};
