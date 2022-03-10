import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";
import { Handler } from "@aws-cdk/aws-lambda";

export class StudentPocStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //dynamoDB
    const studentTable = new dynamodb.Table(this, "student", {
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
    });
    //Lambda

    const createImportTest = new lambda.Function(this, "createTest", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("src/lambda"),
      handler: "student.createNewTest",
      environment: {
        TABLE_NAME: studentTable.tableName,
        PARTITION_KEY: "studentID",
      },
    });

    const getAllTest = new lambda.Function(this, "getAllStudentTest", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("src/lambda"),
      handler: "student.getAlltests",
      environment: {
        TABLE_NAME: studentTable.tableName,
        PARTITION_KEY: "studentID",
      },
    });

    const getAllTestByID = new lambda.Function(this, "getTestByID", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("src/lambda"),
      handler: "student.getTestByStudentID",
      environment: {
        TABLE_NAME: studentTable.tableName,
        PARTITION_KEY: "studentID",
      },
    });

    const updateTest = new lambda.Function(this, "updateStudentTest", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("src/lambda"),
      handler: "student.updateTest",
      environment: {
        TABLE_NAME: studentTable.tableName,
        PARTITION_KEY: "studentID",
      },
    });

    studentTable.grantReadWriteData(getAllTest);
    studentTable.grantReadWriteData(updateTest);
    studentTable.grantReadWriteData(createImportTest);
    studentTable.grantReadWriteData(getAllTestByID);
    //Apigateway

    const api = new apigateway.RestApi(this, "studentApi", {
      restApiName: "Student Domain Api",
    });

    const studentApi = api.root.addResource("student");
    studentApi.addMethod("POST", new apigateway.LambdaIntegration(createImportTest));
    studentApi.addMethod("GET", new apigateway.LambdaIntegration(getAllTest));
    studentApi.addMethod("PUT", new apigateway.LambdaIntegration(updateTest));

    const studentByID = api.root.addResource("studentById");
    studentByID.addMethod("GET", new apigateway.LambdaIntegration(getAllTestByID));


    new cdk.CfnOutput(this, "API URL", {
      value: api.url ?? "Bad action",
    });
  }
}
