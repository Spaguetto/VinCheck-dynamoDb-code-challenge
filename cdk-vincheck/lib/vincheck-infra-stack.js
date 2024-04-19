/**
* Creates an ECS cluster with an EC2-based task definition and an Application Load Balanced service.
* 
* This method sets up the following resources:
* - Imports an existing ECR repository for the container image
* - Creates a new VPC with 2 availability zones
* - Creates an ECS cluster within the VPC
* - Adds EC2 capacity to the cluster using a t2.small instance type
* - Defines a task definition with 1024 MB of memory and 256 CPU units
* - Adds a container to the task definition using the ECR repository image
* - Creates an Application Load Balanced service with a public load balancer and a desired count of 1
*/
const { Stack, Duration } = require('aws-cdk-lib');
const dynamodb = require('aws-cdk-lib/aws-dynamodb');
const ec2 = require('aws-cdk-lib/aws-ec2');
const ecs = require('aws-cdk-lib/aws-ecs');
const ecr = require('aws-cdk-lib/aws-ecr');
const ecs_patterns = require('aws-cdk-lib/aws-ecs-patterns');

class VincheckInfraStack extends Stack {
/**
*
* @param {Construct} scope
* @param {string} id
* @param {StackProps=} props
*/
constructor(scope, id, props) {
super(scope, id, props);

const table = this.createVincheckTable('VincheckTable');

this.createECSCluster();
}

createVincheckTable(tableName) {
const table = new dynamodb.Table(this, 'VincheckTable', {
tableName: tableName,
partitionKey: { name: 'vin', type: dynamodb.AttributeType.STRING }
});
}

/**
* Creates an ECS cluster with an EC2-based task definition and an Application Load Balanced service.
* 
* This method sets up the following resources:
* - Imports an existing ECR repository for the container image
* - Creates a new VPC with 2 availability zones
* - Creates an ECS cluster within the VPC
* - Adds EC2 capacity to the cluster using a t2.small instance type
* - Defines a task definition with 1024 MB of memory and 256 CPU units
* - Adds a container to the task definition using the ECR repository image
* - Creates an Application Load Balanced service with a public load balancer and a desired count of 1
*/
createECSCluster() {
// Import existing ECR Repository
const repo = ecr.Repository.fromRepositoryAttributes(this, 'VinCheckRepo', {
repositoryArn: 'arn:aws:ecr:us-east-1:023352385203:repository/vin-check-nest',
repositoryName: 'vin-check-nest',
})
// Create VPC Resource to place cluster
const vpc = new ec2.Vpc(this, 'Vpc', { maxAzs: 2 });
// Create ECS Cluster
const cluster = new ecs.Cluster(this, 'EcsCluster', { vpc });

// Set cluster capacity to EC2 engine
cluster.addCapacity('EC2', {
instanceType: new ec2.InstanceType('t2.small'),
machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
})

// Set task definition
const taskDefinition = new ecs.TaskDefinition(this, 'TaskDef', {
compatibility: ecs.Compatibility.EC2,
memoryMiB: '1024',
cpu: '256',
});

// Assign a container to the task definition
const container = taskDefinition.addContainer("WebContainer", {
image: ecs.ContainerImage.fromEcrRepository(repo, "3"),
});

container.addPortMappings({
containerPort: 3000
});

const service = new ecs_patterns.ApplicationLoadBalancedEc2Service(this, 'ApplicationLoadBalancedService', {
cluster,
taskDefinition,
desiredCount: 1,
publicLoadBalancer: true,
});

}

}

module.exports = { VincheckInfraStack }
