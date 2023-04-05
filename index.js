const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const upload = require('./upload/UploadImage')
const app = express()
const UserController = require('./controllers/UserController')
const HomeRoute = require('./src/routes/gets/HomeRoute')

const server = require('http').createServer(app)
const { Server } = require("socket.io");
const RegisterRoute = require('./src/routes/gets/RegisterRoute')
const { LoginRoute, ReLogin } = require('./src/routes/gets/LoginRoute')
const SignupRoute = require('./src/routes/posts/SignupRoute')
const GetAllUserRoute = require('./src/routes/gets/GetAllUserRoute')
const UserCollection = require('./model/User')
const UploadAvatar = require('./src/routes/posts/UploadAvatar')
const ConnectMongo = require('./databases/ConnectMongo')
const { InsertMessage, GetMessage } = require('./controllers/MessageController')
const MessageCollection = require('./model/Message')
const GetMessageByTarget = require('./src/routes/gets/GetMessageByTarget')
const io = new Server(server);
const bodyParser = require('body-parser')
const UserRoute = require('./src/routes/UserRoute')
const CheckLoginExpressRoute = require('./src/routes/posts/CheckLoginExpressRoute')
const UserRouteMb = require('./src/routes/mobile-routes/UserRouteMobile')
const MessageRouteMb = require('./src/routes/mobile-routes/MessageRouteMobile')
const MessageController = require('./controllers/MessageController')
var Handlebars = require('handlebars');

const PORT = 3000

//public file
app.use(express.static(path.join(__dirname, './public')));

app.engine('hbs', handlebars.engine({
     extname: '.hbs'
}));

//add user 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "/src/views"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use('/user', UserRoute)

Handlebars.registerHelper("inc", function (value, options) {
     return parseInt(value) + 1;
});

//connect to mongo
ConnectMongo(mongoose)
//open connect
app.listen(PORT, (req, res) => {
     console.log('====================================');
     console.log(`START AT PORT ${PORT}`);
     console.log('====================================');
})
//init route
HomeRoute(app, UserController)
RegisterRoute(app)
LoginRoute(app)

SignupRoute(app, UserController)


GetAllUserRoute(app)
UploadAvatar(app, upload)
GetMessageByTarget(app, MessageCollection)

//express web
CheckLoginExpressRoute.CheckLoginExpressRoute(app, UserController)
CheckLoginExpressRoute.ReLoginC(app)

//mobileRoute
UserRouteMb.checkLogin(app, UserController)
UserRouteMb.getUserChatedByIdUser(app, UserController)

//socket IO
io.listen(3002)

var listUserOnline = []
io.on("connection", async (socket) => {
     const count = io.engine.clientsCount;

     socket.on('initIdDb', (id) => {
          console.log('id from client is: ' + id);
          console.log('====================================');
          console.log(socket.id);
          console.log('====================================');
          listUserOnline.push(
               {
                    idSocket: socket.id,
                    userId: id
               }
          )
          console.log('====================================');
          console.log("Client connected: ", count);
          console.log("List online: ", listUserOnline);
          console.log('====================================');

     });

     // const data = UserCollection.find()
     // socket.emit('message', data);

     //send public
     socket.on('room-public', async (data) => {
          await InsertMessage(data, MessageCollection)
          const optionGetMessage = {
               target: "public"
          }
          const arrMessage = await GetMessage(optionGetMessage)
          io.sockets.emit('message-public', arrMessage);

          console.log('====================================');
          console.log(socket.id);
          console.log('====================================');
     });

     //send private
     socket.on('room-private', (data) => {
          console.log('data is: ' + data);
          socket.emit('welcome', { message: data, userId: socket.id });
          console.log('====================================');
          console.log(socket.id);
          console.log('====================================');
     });

     //send broadcast
     socket.on('room-broadcast', async (data) => {
          console.log('id user chating is: ' + data); //data has idUserGet

          socket.on('add-message', async (data) => {
               console.log('message-added', data);
               data = JSON.parse(data)

               const listUserGet = listUserOnline.filter(it => {
                    return it.userId == data.idUserGet
               })

               // const listUserSend = listUserOnline.filter(it => {
               //      return it.userId == data.idUserSend
               // })
               console.log('listUserGet size: ' + listUserGet.length);
               await InsertMessage(data, MessageCollection)

               //get all message
               const optionGetMessage = {
                    target: "public"
               }
               const arrMessage = await GetMessage(optionGetMessage)
               console.log("GET MESSAGE: "+arrMessage);

               const listMessage = await MessageController.getMessageByUserSendIdAndUserTargetId(data.idUserSend, data.idUserGet)
               console.log('listMessage: ' + listMessage);
               if (listUserGet.length > 0) {      
                    io.to(listUserGet[listUserGet.length - 1].idSocket).emit("message-broadcast", [data])
                    console.log('send: ' + socket.id + '\nget: ' + typeof listUserGet[0].idSocket);
               }

          })

     });


     //onDisconnect
     socket.on('disconnect', (data) => {
          console.log('Socket disconnected: ' + socket.id)
          listUserOnline = listUserOnline.filter(it => {
               socket.id != it.idSocket
          })
     })
})

module.exports.PORT = PORT