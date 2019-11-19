#!/usr/bin/env node
import 'source-map-support/register';
import { App, Tag } from '@aws-cdk/core';
import { VpcStack, PrivateSubnetStack, PublicSubnetStack } from '../lib/vpc-stack';

const app = new App();
const env = {
  region: process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
};
const vpcStack = new VpcStack(app, 'VpcStack', { env });
const privateSubnetStack = new PrivateSubnetStack(app, 'PrivateSubnetStack', vpcStack.vpc.vpcId);
const publicSubnetStack = new PublicSubnetStack(app, 'PublicSubnetStack', vpcStack.vpc.vpcId);

Tag.add(privateSubnetStack, 'kubernetes.io/role/internal-elb', '1', {
  includeResourceTypes: ['AWS::EC2::Subnet'],
});

Tag.add(publicSubnetStack, 'kubernetes.io/role/elb', '1', {
  includeResourceTypes: ['AWS::EC2::Subnet'],
});

