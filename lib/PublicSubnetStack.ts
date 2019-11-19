import { Construct, ConcreteDependable } from '@aws-cdk/core';
import { PublicSubnet, ISubnet } from '@aws-cdk/aws-ec2';

import { AvailabilityZones } from './interfaces';
import BaseStack from './BaseStack';

export default class PublicSubnetStack extends BaseStack {
  public readonly subnets: ISubnet[];

  constructor(
    scope: Construct,
    id: string,
    vpcId: string,
    igwId: string,
    availabilityZones: AvailabilityZones) {
    super(scope, id);

    const subnets = Object.entries(availabilityZones).map(([availabilityZone, { public: cidrBlock }]) => {
      const subnet = new PublicSubnet(this, `publicSubnet-${availabilityZone}`, {
        availabilityZone,
        cidrBlock,
        vpcId,
        mapPublicIpOnLaunch: true,
      });
      subnet.addDefaultInternetRoute(igwId, new ConcreteDependable());
      return subnet;
    })
  }
}
