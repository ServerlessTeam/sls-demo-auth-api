import {
  DynamoDBClient,
  type DynamoDBClientConfig,
} from '@aws-sdk/client-dynamodb';
import { Table } from 'dynamodb-onetable';
import Dynamo from 'dynamodb-onetable/Dynamo';

import { UserType, schema } from '@/db/schema';

const { AWS_REGION, DATA_TABLE } = process.env;

const ddbClientOptions: DynamoDBClientConfig = {
  region: AWS_REGION,
};

export const table = new Table({
  name: DATA_TABLE,
  client: new Dynamo({
    client: new DynamoDBClient(ddbClientOptions),
  }),
  schema,
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User = table.getModel<UserType>('User');
