import * as AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient();
const TABLENAME = process.env.TABLE_NAME || "student";
exports.createNewTest = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);

    const data =
      typeof event.body === "object" ? event.body : JSON.parse(event.body);
    const PIN = String.fromCharCode(14 + Math.floor(Math.random()) * 26);
    const SIN = String.fromCharCode(14 + Math.floor(Math.random()) * 26);
    data["PK"] = "S123";
    data["SK"] = "T123";

    const params = {
      TableName: TABLENAME,
      Item: data,
    };

    console.log("data----------", data);
    const response = await db.put(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err),
    };
  }
};

exports.getAlltests = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);

    const params = {
      TableName: TABLENAME,
    };
    const response = await db.scan(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err),
    };
  }
};

exports.getTestByStudentID = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `${event.path}\n`,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err),
    };
  }
};
exports.updateTest = async function (event: any) {
  try {
    console.log("POC", event.path);
    console.log("POC", event.httpMethod);
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/plain" },
      body: `${event.requestContext}\n`,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(err),
    };
  }
};
