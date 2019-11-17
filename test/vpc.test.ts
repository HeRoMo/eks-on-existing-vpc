import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Vpc = require('../lib/vpc-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Vpc.VpcStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});