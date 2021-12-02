import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { EmpleadoRepository } from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
import { Empleado } from '../models';
import { stringify } from 'querystring';
import { repository } from '@loopback/repository';
import { Llaves } from '../Config/Llaves';
const jwt = require('jsonwebtoken');


@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {
  constructor(@repository(EmpleadoRepository)
  public empleadorepositorio: EmpleadoRepository) {
  }

  /*
   * Add service methods here
   */

  public GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  EnviarMensajePass( celular:string,texto:string): string {
    console.log(" Se envió la clave.");

    const accountSid = ''; 
    const authToken = ''; 

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: texto,//'Hola ' + nombre + ' su usuario es ' + Email + ' y su clave es ' + clave

        to: '+57'+celular, // Text this number
        from: '', // From a valid Twilio number
      })
      .then((message: any) => console.log(message.sid));

    return 'grupo 10 correo electronico ';

  }

  identificarPersona(usuario: string, clave: string) {

    try {
      let z = this.empleadorepositorio.findOne({ where: { Email: usuario, clave: clave } })

      if (z) {
        return z;
      }
      return false;
    }
    catch {
      return false;
    }
  }

  generarToken(empleado: Empleado) {

    let token = jwt.sign({

      data: {
        id: empleado.id,
        nombre: empleado.nombre,
        correo: empleado.Email,
      }
    },
      Llaves.clavejwt);
    return token;
  }
  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.clavejwt);
      return datos;

    } catch {
      return false;

    }
  }

}