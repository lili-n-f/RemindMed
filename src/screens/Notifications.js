/*import { Permissions, Notifications } from 'expo';
import React from 'react';

export default class Notification extends React.Component{

    componentDidMount() {
      this.registerForPushNotifications();
    }
    
    registerForPushNotifications = async () => {
      //Chequea si hay permisos existentes 
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = status;
    
      // si no hay permisos existentes le solicita al usaurio el permiso 
      if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
        //S i no acepta el permiso salimos de la funcion 
    
        if (finalStatus !== 'granted') { return; }
    
       // Toma el token de la notificacion 
       
       let token = await Notifications.getExpoPushTokenAsync();
       console.log(token);
    
    }

    render(){
        return <></>
    }
}*/
