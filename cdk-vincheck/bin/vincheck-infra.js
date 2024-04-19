#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { VincheckInfraStack } = require('../lib/vincheck-infra-stack');

const app = new cdk.App();
new VincheckInfraStack(app, 'VincheckInfraStack1', {});
