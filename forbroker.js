var io = require("socket.io-client");

// MQTT Definisions
const aedes = require('aedes')()
const mqtt_server = require('net').createServer(aedes.handle)
const mqtt_port = 1883
const addressOfIOS = process.argv[2];


var socket = io(addressOfIOS)


function send(data)
{   

    socket.emit("data",data);
}


aedes.on('publish',(data)=>{
    console.log(data);
        if(data.topic == "temp")
      send(data.payload.toString())
  });

// MQTT START
mqtt_server.listen(mqtt_port, function () {
    console.log('server started and listening on port ', mqtt_port)
  
    
})
  