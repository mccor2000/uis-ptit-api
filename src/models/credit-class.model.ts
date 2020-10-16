import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strictObjectIDCoercion: false,
    mongodb: {collection: 'credit_classes'},
  },
})
export class CreditClass extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  classId: string;

  @property({
    type: 'string',
    required: true,
  })
  subjectId: string;

  @property({
    type: 'string',
    required: true,
  })
  subjectTitle: string;

  @property({
    type: 'string',
    required: true,
  })
  group: string;

  @property({
    type: 'string',
    required: true,
  })
  credits: string;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  classes?: string[];

  @property({
    type: 'object',
    default: {},
  })
  schedule?: object;

  @property({
    type: 'object',
    default: [],
  })
  students?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CreditClass>) {
    super(data);
  }
}

export interface CreditClassRelations {
  // describe navigational properties here
}

export type CreditClassWithRelations = CreditClass & CreditClassRelations;
