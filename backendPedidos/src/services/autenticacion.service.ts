import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { EmpleadoRepository } from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
import {Empleado} from '../models';
import { stringify } from 'querystring';
import { repository } from '@loopback/repository';
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(EmpleadoRepository)
      public empleadorepositorio: EmpleadoRepository) {
      }

  /*
   * Add service methods here
   */

  public GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  EnviarMensajePass(clave:string,nombre:string,Email:string):string
  {
     console.log(" Se envió la clave.");

     const accountSid = 'ACab433b8e08ad0fbdf9c9c9c9a94baacd'; // Your Account SID from www.twilio.com/console
     const authToken = '28fcf2bc0448a310caa892979dc6d85e'; // Your Auth Token from www.twilio.com/console
 
     const twilio = require('twilio');
     const client = new twilio(accountSid, authToken);

       client.messages
       .create({
         body: 'Hola '+nombre+' su usuario es '+Email+' y su clave es '+clave,

         to: '+573192540178', // Text this number
         from: '+12059533308', // From a valid Twilio number
       })
       .then((message:any) => console.log(message.sid));    

     return 'grupo 10 correo electronico ';
  
   }

   identificarPersona(usuario:string,clave:string){

      try {
        let z= this.empleadorepositorio.findOne({where:{Email:usuario,clave:clave}})

        if (z){

          return z;

        }

        return false;
      }
      catch{

        return false;
      }
   }

   generarToken(empleado:Empleado){

      let Token= jwt.sign({

        data:{
          id: empleado.id,
          nombre: empleado.nombre,
          correo: empleado.Email,
        },
      })
   }
  }