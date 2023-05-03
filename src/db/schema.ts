/* eslint-disable no-template-curly-in-string */
import { Entity, OneSchema } from 'dynamodb-onetable';

export const schema = {
  version: '0.0.1',
  indexes: {
    primary: {
      hash: 'pk',
      sort: 'sk',
    },
  },
  models: {
    User: {
      pk: { type: String, value: 'CLIENT#${email}' },
      sk: { type: String, value: 'CLIENT_INFO' },
      id: { type: String, required: true },
      email: { type: String, required: true },
      passwordHash: { type: String, required: true },
      deleteAt: { type: Number, required: true },
    },
  } as const,
} satisfies OneSchema;

export type UserType = Entity<typeof schema.models.User>;
