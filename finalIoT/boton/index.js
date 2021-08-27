let host = "localhost";
let port = '1883';
let client = mqtt.connect("mqtt://" + host + ":" + port );

let solounclick = true;

console.log(client);

client.on('connect', () => {  
  client.publish("Boton", "El boton esta arriba");
  client.subscribe('button');
});

client.on('message', (topic, message)=>{
  if(message.toString() === 'cant push'){
    solounclick = false;
  }
  else if(message.toString() === 'can push'){
    solounclick = true;
  }
});

document.getElementById('btn').addEventListener('click', boton);

function boton() {
  if(solounclick){
    client.publish('semaphore', 'Change_button');  
      // Se añaden request a las estadísticas
    }
    client.publish('estadistica', JSON.stringify({id:client.options.clientId, name: "Boton"}));
}