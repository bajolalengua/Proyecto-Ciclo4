import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  EnviarNotificacionesPorSMS(celular:string,texto:string):void
  {
    console.log("notificacion sms se agrego empleado");

    const accountSid = ''; // Your Account SID from www.twilio.com/console
    const authToken = ''; // Your Auth Token from www.twilio.com/console
  
    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: texto,
//conexión carlos
        to: '+57'+celular , // Text this number
        from: '', // From a valid Twilio number


      })
      .then((message:any) => console.log(message.sid));

  }
  EnviarMensajePass():void
  {
    
   }

}
