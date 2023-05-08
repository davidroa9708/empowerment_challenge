import { CreateTableCommand, CreateTableInput } from '@aws-sdk/client-dynamodb';
import { migrationDBClient } from '../dynamoDBClient';

const recommendationsTable: CreateTableInput = {
  TableName: "recommendations",
  AttributeDefinitions: [
    {
      AttributeName: "id",
      AttributeType: "S"
    }
  ],
  KeySchema: [
    {
      "AttributeName": "id",
      "KeyType": "HASH"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};



const command = new CreateTableCommand(recommendationsTable);
migrationDBClient
  .send(command)
  .then((r) => {
    console.log(r);
  }).catch((e) => {
    console.log(e);
  });
