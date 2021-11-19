import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MensajeEmpleado, MensajeEmpleadoRelations} from '../models';

export class MensajeEmpleadoRepository extends DefaultCrudRepository<
  MensajeEmpleado,
  typeof MensajeEmpleado.prototype.idmensaje,
  MensajeEmpleadoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(MensajeEmpleado, dataSource);
  }
}
