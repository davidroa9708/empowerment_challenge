import { CreateTableCommand, CreateTableInput } from '@aws-sdk/client-dynamodb';
import { migrationDBClient } from '../dynamoDBClient';

const dishesTable: CreateTableInput = {
  TableName: "dishes",
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



const command = new CreateTableCommand(dishesTable);
migrationDBClient
  .send(command)
  .then((r) => {
    console.log(r);
  }).catch((e) => {
    console.log(e);
  });
