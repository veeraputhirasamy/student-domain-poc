#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StudentPocStack } from '../lib/student_poc-stack';

const app = new cdk.App();
new StudentPocStack(app, 'StudentPocStack');
