import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Student} from '../models';
import {StudentRepository} from '../repositories';

export class StudentController {
  constructor(
    @repository(StudentRepository)
    public studentRepository: StudentRepository,
  ) {}

  @get('/students/count', {
    responses: {
      '200': {
        description: 'Student model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Student) where?: Where<Student>): Promise<Count> {
    return this.studentRepository.count(where);
  }

  @get('/students', {
    responses: {
      '200': {
        description: 'Array of Student model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Student, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Student) filter?: Filter<Student>,
  ): Promise<Student[]> {
    return this.studentRepository.find(filter);
  }

  @get('/students/{id}', {
    responses: {
      '200': {
        description: 'Student model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Student, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Student, {exclude: 'where'})
    filter?: FilterExcludingWhere<Student>,
  ): Promise<Student> {
    return this.studentRepository.findById(id, filter);
  }
}
