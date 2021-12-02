import { service } from '@loopback/core';
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
  response,
  HttpErrors,
} from '@loopback/rest';
//import fetch from 'node-fetch';
import { Credenciales, Empleado, Mensaje } from '../models';
import { EmpleadoRepository, MensajeRepository } from '../repositories';
import { NotificacionService } from '../services';
import { AutenticacionService } from '../services';


export class EmpleadoController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository: MensajeRepository  ,
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
    @service(NotificacionService)
    public notificaciones: NotificacionService,
    @service(AutenticacionService)
    public autenticacion: AutenticacionService
  ) { }
  @post('/identificarEmpleado',{
    responses:{
      '200':{
        description: "identificacion usuarios"
      }
    }
  })
  async identificarEmpleado(@requestBody()credenciales: Credenciales){
    let e = await this.autenticacion.identificarPersona(credenciales.usuario,credenciales.clave);
    if(e){
      let token=this.autenticacion.generarToken(e);
      return {
        datos:{
          nombre:e.nombre,
          correo:e.Email,
          id:e.id,

        },
        token:token,
      }
    }else {
      throw new HttpErrors[401]("Datos invalidos");
    }

  }




  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Empleado) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {

    let clave = this.autenticacion.GenerarClave()
    let claveCifrada = this.autenticacion.CifrarClave(clave);
    empleado.clave = claveCifrada

    let p = await this.empleadoRepository.create(empleado);

    //Con este notificamos al usuario: 
    let texto = `Hola ${empleado.nombre}, su nombre de usuario es: ${empleado.Email}, y su contraseña es: ${clave}`;
    this.autenticacion.EnviarMensajePass(empleado.telefono,texto);
    let texto2='se agrego empleado'
    this.notificaciones.EnviarNotificacionesPorSMS(empleado.telefono,texto2);
    let mensaje= new Mensaje ({
      mensajeEmpleado: texto,
      telefono: empleado.telefono
    
    })
    this.mensajeRepository.create(mensaje);

    return p;
  }

  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, { partial: true }),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, { exclude: 'where' }) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, { partial: true }),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
