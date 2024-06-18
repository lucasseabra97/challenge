import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const REGION = 'eu-west-1'; 

const client = new DynamoDBClient({ region: REGION });
export const ddbDocClient = DynamoDBDocumentClient.from(client);

