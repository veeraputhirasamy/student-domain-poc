#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { StudentPocStack } from "../lib/student_poc-stack";

// const env = {
//   region: "us-east-1",
//   account: "",
// };

const app = new cdk.App();
new StudentPocStack(app, "StudentPocStack",{
    description:"Sample poc cdk CRUD app"
});
