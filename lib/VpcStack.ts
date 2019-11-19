import { Construct } from '@aws-cdk/core';
import { Vpc, IVpc } from '@aws-cdk/aws-ec2';

import BaseStack from './BaseStack';

export default class VpcStack extends BaseStack {
  public readonly vpc: IVpc;

  constructor(scope: Construct, id: string, vpcId: string) {
    super(scope, id);

    this.vpc = Vpc.fromLookup(this, 'DefaultVpc', { vpcId });
  }
}
