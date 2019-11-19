import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
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

test('VpcStack', () => {
    const app = new App();
    const stack = new VpcStack(app, 'MyTestStack', vpcId);
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('VpcStack', () => {
  const app = new App();

  const stack = new PrivateSubnetStack(app, 'MyTestStack', vpcId, natGwId, availabilityZones);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('VpcStack', () => {
  const app = new App();
  const stack = new PublicSubnetStack(app, 'MyTestStack', vpcId, igwId, availabilityZones);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
