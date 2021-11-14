import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  EnviarNotificacionesPorSMS():void
  {
    console.log("notificacion sms se agrego empleado");
/* conexion Carlos
    const accountSid = 'AC868c9e7ffb558bd592362c2f14170dd6'; // Your Account SID from www.twilio.com/console
    const authToken = 'c203d0803f723fe6ba5440d9a2fad418'; // Your Auth Token from www.twilio.com/console
    */
   // conexion Rocio
    const accountSid = 'ACbbc256577ed0f4b412c4979802afd1bd'; // Your Account SID from www.twilio.com/console
    const authToken = 'd334978e0a44ec66974a0bfbca6c9040'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: 'se agrego empleado',
/*conexión carlos
        to: '+573225910556', // Text this number
        from: '+16672131003', // From a valid Twilio number
*/
//conexion Rocio
        to: '+573222360608', // Text this number
        from: '+18507357483', // From a valid Twilio number
      })
      .then((message:any) => console.log(message.sid));

  }
  EnviarMensajePorCorreo():string
   {
     return 'grupo 10 correo electronico ';
   }

}
