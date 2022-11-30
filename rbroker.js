
// MQTT Definisions
const aedes = require('aedes')()
const mqtt_server = require('net').createServer(aedes.handle)
const mqtt_port = 1884

const port = process.argv[2];

// SOCKET IO SERVER DEFINITIONS
const app = require('express')();
const http = require('http').createServer(app);
const ios = require('socket.io')(http);


ios.on('connection',
    (socket)=> {
        console.log("Connected " + socket.id )
        // ios.emit("connection","connected successfully");

        socket.on("data", (data)=> {          
          aedes.publish({ topic: 'temp', dup:true, payload:data  })
        })
        
      }
  );



// MQTT START
mqtt_server.listen(mqtt_port, function () {
    console.log('server started and listening on port ', mqtt_port)
    // setInterval(()=>{
    //   // aedes.publish({ topic: 'aedes', dup:true, payload: "dummy message @aedes From broker 1" })
    // },5000)
  })
  


  // SOCKET IO SERVER START
http.listen(
  port,'0.0.0.0', () => {
  console.log('listening on *:' + port);
});
  