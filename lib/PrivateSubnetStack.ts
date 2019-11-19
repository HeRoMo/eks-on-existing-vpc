import { Construct } from '@aws-cdk/core';
import { PrivateSubnet, ISubnet } from '@aws-cdk/aws-ec2';

import { AvailabilityZones } from './interfaces';
import BaseStack from './BaseStack';

export default class PrivateSubnetStack extends BaseStack {
  public readonly subnets: ISubnet[];
  constructor(
    scope: Construct,
    id: string,
    vpcId: string,
    natGwId: string,
    availabilityZones: AvailabilityZones) {
    super(scope, id);

    this.subnets = Object.entries(availabilityZones).map(([availabilityZone, { private: cidrBlock } ]) => {
      const subnet = new PrivateSubnet(this, `privateSubnet-${availabilityZone}`, {
        availabilityZone,
        cidrBlock,
        vpcId,
        mapPublicIpOnLaunch: true,
      });
      subnet.addDefaultNatRoute(natGwId);
      return subnet;
    });
  }
}
