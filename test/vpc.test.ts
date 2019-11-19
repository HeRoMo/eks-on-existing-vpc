import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { VpcStack, PrivateSubnetStack, PublicSubnetStack } from '../lib/vpc-stack';

const vpcId = process.env.VPC_ID || '';

test('VpcStack', () => {
    const app = new App();
    const stack = new VpcStack(app, 'MyTestStack');
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('VpcStack', () => {
  const app = new App();

  const stack = new PrivateSubnetStack(app, 'MyTestStack', vpcId);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});

test('VpcStack', () => {
  const app = new App();
  const stack = new PublicSubnetStack(app, 'MyTestStack', vpcId);
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
