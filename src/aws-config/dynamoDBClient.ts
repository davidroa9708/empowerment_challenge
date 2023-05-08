import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as AWS from 'aws-sdk';

const { AWS_REGION, AWS_ACCES_KEY, AWS_SECRET_KEY } = process.env;

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCES_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

const dynamoClient = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
});
const migrationDBClient = DynamoDBDocumentClient.from(dynamoClient);
export { migrationDBClient };
