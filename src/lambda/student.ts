import * as AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient();
const TABLENAME = process.env.TABLE_NAME || "student";
const PK = "S123";
const SK = "T123";

exports.createNewTest = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);

    const data =
      typeof event.body === "object" ? event.body : JSON.parse(event.body);
    data["PK"] = PK;
    data["SK"] = SK;

    const params = {
      TableName: TABLENAME,
      Item: data,
    };

    console.log("data----------", data);
    const response = await db.put(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(err),
    };
  }
};

exports.getAlltests = async function (event: any) {
  try {
    console.log("POC", event);
    console.log("POC", event.httpMethod);
    const params = {
      TableName: TABLENAME,
    };
    const response = await db.scan(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(err),
    };
  }
};

exports.getTestByStudentID = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);

    event.queryStringParameters;
    const params = {
      TableName: TABLENAME,
      KeyConditionExpression: "#PK = :PV",
      ExpressionAttributeNames: {
        "#PK": "PK",
      },
      ExpressionAttributeValues: {
        ":PV": event.queryStringParameters.sid,
      },
    };
    const response = await db.query(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(err),
    };
  }
};
exports.updateTest = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);
    const data =
      typeof event.body === "object" ? event.body : JSON.parse(event.body);

    console.log(data);
    const params = {
      TableName: TABLENAME,
      Key: {
        PK: PK,
        SK: SK,
      },
      UpdateExpression: "set info.plot = :i",
      ExpressionAttributeValues: {
        ":i": data.info.plot,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const response = await db.update(params).promise();
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/json" },
      body: JSON.stringify(err),
    };
  }
};
