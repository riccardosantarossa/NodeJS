const { Socket } = require('dgram');
const net = require('net');
const port = 7979;
const all=false; 
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
          all=true;
        }
        else
        {
          let lastChar=msg.charAt(msg.length-3);
          if(lastChar=="#")
          {
            let broadcast = msg.replace("#", "");
            //clients.forEach(socket.write(broadcast)); ERRORE!!!!
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
        if(all == true)
        {
          clients.forEach(socket.end);
          console.log('all clients disconnected');
        }
        else
          console.log('client disconnected');
    });

});

server.listen(port, () => {
    console.log('Server in ascolto sulla porta', port);
});

server.on('connection', () => {
    console.log('someone connected');
});



