//SANTAROSSA RICCARDO 5BIA 23/11/2021

const { Socket } = require('dgram');
const net = require('net');
const port = 7979;
const clients = [];

const server = net.createServer(socket => 
  {

    clients.push(socket);

    let msg ="";
    let msg2;

    socket.on('data', data => {
      msg+=data;
      if(data.toString().charCodeAt(0)==13)
      {
        msg2=msg.replace("\r\n","")
        if(msg2== "quit")
        {
            socket.end();
        }
        else if((msg2=="quitall"))
        {
            for(var i of clients)
              i.end();
            
            console.log("all clients disconnected");
        }
        else
        {
          let lastChar=msg.charAt(msg.length-3);
          let broadcast = msg.replace("#","");
          if(lastChar=="#")
          {
              for(var i of clients)
                i.write(broadcast);

              msg="";
          }
          else
          {
            socket.write(msg);
            msg="";
          }
        }
      }
    });

    socket.on('end', () =>{

          console.log('client disconnected');
    });

});

server.listen(port, () => {
    console.log('Server in ascolto sulla porta', port);
});

server.on('connection', () => {
    console.log('someone connected');
});



