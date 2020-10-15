import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CreditClass} from '../models';
import {CreditClassRepository} from '../repositories';

export class CreditClassController {
  constructor(
    @repository(CreditClassRepository)
    public creditClassRepository : CreditClassRepository,
  ) {}

  @post('/credit-classes', {
    responses: {
      '200': {
        description: 'CreditClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(CreditClass)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditClass, {
            title: 'NewCreditClass',
            exclude: ['_id'],
          }),
        },
      },
    })
    creditClass: Omit<CreditClass, '_id'>,
  ): Promise<CreditClass> {
    return this.creditClassRepository.create(creditClass);
  }

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

  @patch('/credit-classes', {
    responses: {
      '200': {
        description: 'CreditClass PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditClass, {partial: true}),
        },
      },
    })
    creditClass: CreditClass,
    @param.where(CreditClass) where?: Where<CreditClass>,
  ): Promise<Count> {
    return this.creditClassRepository.updateAll(creditClass, where);
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
    @param.path.object('id') id: object,
    @param.filter(CreditClass, {exclude: 'where'}) filter?: FilterExcludingWhere<CreditClass>
  ): Promise<CreditClass> {
    return this.creditClassRepository.findById(id, filter);
  }

  @patch('/credit-classes/{id}', {
    responses: {
      '204': {
        description: 'CreditClass PATCH success',
      },
    },
  })
  async updateById(
    @param.path.object('id') id: object,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditClass, {partial: true}),
        },
      },
    })
    creditClass: CreditClass,
  ): Promise<void> {
    await this.creditClassRepository.updateById(id, creditClass);
  }

  @put('/credit-classes/{id}', {
    responses: {
      '204': {
        description: 'CreditClass PUT success',
      },
    },
  })
  async replaceById(
    @param.path.object('id') id: object,
    @requestBody() creditClass: CreditClass,
  ): Promise<void> {
    await this.creditClassRepository.replaceById(id, creditClass);
  }

  @del('/credit-classes/{id}', {
    responses: {
      '204': {
        description: 'CreditClass DELETE success',
      },
    },
  })
  async deleteById(@param.path.object('id') id: object): Promise<void> {
    await this.creditClassRepository.deleteById(id);
  }
}
