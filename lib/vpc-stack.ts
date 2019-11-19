import { Construct, Stack, StackProps, ConcreteDependable } from '@aws-cdk/core';
import { Vpc, PrivateSubnet, PublicSubnet, ISubnet, IVpc } from '@aws-cdk/aws-ec2';

const availabilityZones = ['ap-northeast-1a', 'ap-northeast-1c', 'ap-northeast-1d'];

const VPC_ID = process.env.VPC_ID || '';
const IGW_ID = process.env.IGW_ID || '';
const NAT_GW_ID = process.env.NAT_GW_ID || '';

export class PrivateSubnetStack extends Stack {
  public readonly subnets: ISubnet[];
  constructor(scope: Construct, id: string, vpcId: string, props?: StackProps) {
    super(scope, id, props);

    let netId = 50;
    this.subnets = availabilityZones.map((availabilityZone) => {
      const subnet = new PrivateSubnet(this, `privateSubnet-${availabilityZone}`, {
        availabilityZone,
        cidrBlock: `172.31.${netId += 1}.0/24`,
        vpcId,
        mapPublicIpOnLaunch: true,
      });
      subnet.addDefaultNatRoute(NAT_GW_ID);
      return subnet;
    });
  }
}

export class PublicSubnetStack extends Stack {
  public readonly subnets: ISubnet[];

  constructor(scope: Construct, id: string, vpcId: string, props?: StackProps) {
    super(scope, id, props);

    let netId = 60;
    const subnets = availabilityZones.map((availabilityZone) => {
      const subnet = new PublicSubnet(this, `publicSubnet-${availabilityZone}`, {
        availabilityZone,
        cidrBlock: `172.31.${netId += 1}.0/24`,
        vpcId,
        mapPublicIpOnLaunch: true,
      });
      subnet.addDefaultInternetRoute(IGW_ID, new ConcreteDependable());
      return subnet;
    })
  }
}

export class VpcStack extends Stack {
  public readonly vpc: IVpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.vpc = Vpc.fromLookup(this, 'DefaultVpc', {
      vpcId: VPC_ID,
    });
  }
}
