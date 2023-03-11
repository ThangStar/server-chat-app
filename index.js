const { Socket } = require('dgram')
const express = require('express')
const app = express()
// const morgan = require('morgan')
const port = 3000
// const server = require('http').createServer(app)
// const { Server } = require("socket.io") ;
// const io = new Server(server);

// app.use(morgan('combined'))
// app.use(express.json())

// io.listen(port)
app.get('/', (req, res) => {
     res.send('Hello World!')
})

app.listen(port, () => {
     console.log(`Example app listening at http://localhost:${port}`)
})

// io.on("connection", socket => {
//      const count = io.engine.clientsCount;
//      console.log('====================================');
//      console.log("Client connect: ", count);
//      console.log('====================================');

//      //send public
//      socket.on('message-public', (data) => {
//           console.log('data is: ' + data);
//           io.sockets.emit('welcome', { message: data, userId: socket.id });
//           console.log('====================================');
//           console.log(socket.id);
//           console.log('====================================');
//      });

//      //send private
//      socket.on('message-private', (data) => {
//           console.log('data is: ' + data);
//           socket.emit('welcome', { message: data, userId: socket.id });
//           console.log('====================================');
//           console.log(socket.id);
//           console.log('====================================');
//      });

//      //send broadcast
//      socket.on('message-broadcast', (data) => {
//           console.log('data is: ' + data);
//           socket.broadcast.emit('welcome', { message: data, userId: socket.id });
//           console.log('====================================');
//           console.log(socket.id);
//           console.log('====================================');
//      });
// })

