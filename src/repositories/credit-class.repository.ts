import {DefaultCrudRepository} from '@loopback/repository';
import {CreditClass, CreditClassRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CreditClassRepository extends DefaultCrudRepository<
  CreditClass,
  typeof CreditClass.prototype._id,
  CreditClassRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(CreditClass, dataSource);
  }
}
