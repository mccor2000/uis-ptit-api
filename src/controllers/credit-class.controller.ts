import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {CreditClass} from '../models';
import {CreditClassRepository} from '../repositories';

export class CreditClassController {
  constructor(
    @repository(CreditClassRepository)
    public creditClassRepository: CreditClassRepository,
  ) {}

  @get('/credit-classes/count', {
    responses: {
      '200': {
        description: 'CreditClass model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CreditClass) where?: Where<CreditClass>,
  ): Promise<Count> {
    return this.creditClassRepository.count(where);
  }

  @get('/credit-classes', {
    responses: {
      '200': {
        description: 'Array of CreditClass model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CreditClass, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CreditClass) filter?: Filter<CreditClass>,
  ): Promise<CreditClass[]> {
    return this.creditClassRepository.find(filter);
  }

  @get('/credit-classes/{id}', {
    responses: {
      '200': {
        description: 'CreditClass model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CreditClass, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CreditClass, {exclude: 'where'})
    filter?: FilterExcludingWhere<CreditClass>,
  ): Promise<CreditClass> {
    return this.creditClassRepository.findById(id, filter);
  }
}
