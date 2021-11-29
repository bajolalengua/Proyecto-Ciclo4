import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';
const twilio = require('twilio');
@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo: number;

  @property({
    type: 'boolean',
    required: true,
  })
  esDirectivo: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esCliente: boolean;
  
  @property({
    type: 'string',
    required: true,
  })
  numeroDocumento: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: String;
  
  

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
