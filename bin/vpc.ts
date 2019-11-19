#!/usr/bin/env node
import 'source-map-support/register';
import { App, Tag } from '@aws-cdk/core';
import VpcStack from '../lib/VpcStack';
import PrivateSubnetStack from '../lib/PrivateSubnetStack';
import PublicSubnetStack from '../lib/PublicSubnetStack';

const vpcId = process.env.VPC_ID || '';
const igwId = process.env.IGW_ID || '';
const natGwId = process.env.NAT_GW_ID || '';

const availabilityZones = {
  'ap-northeast-1a': { private: '172.31.51.0/24', public: '172.31.61.0/24' },
  'ap-northeast-1c': { private: '172.31.52.0/24', public: '172.31.62.0/24' },
  'ap-northeast-1d': { private: '172.31.53.0/24', public: '172.31.63.0/24' },
};

const app = new App();
const vpcStack = new VpcStack(app, 'VpcStack', vpcId);

const privateSubnetStack = new PrivateSubnetStack(app, 'PrivateSubnetStack', vpcStack.vpc.vpcId, natGwId, availabilityZones);
Tag.add(privateSubnetStack, 'kubernetes.io/role/internal-elb', '1', {
  includeResourceTypes: ['AWS::EC2::Subnet'],
});

const publicSubnetStack = new PublicSubnetStack(app, 'PublicSubnetStack', vpcStack.vpc.vpcId, igwId, availabilityZones);
Tag.add(publicSubnetStack, 'kubernetes.io/role/elb', '1', {
  includeResourceTypes: ['AWS::EC2::Subnet'],
});

