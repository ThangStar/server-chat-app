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
const {LoginRoute, ReLogin} = require('./src/routes/gets/LoginRoute')
const SignupRoute = require('./src/routes/posts/SignupRoute')
const CheckLoginRoute = require('./src/routes/posts/CheckLoginRoute')
const GetAllUserRoute = require('./src/routes/gets/GetAllUserRoute')
const UserCollection = require('./model/User')
const UploadAvatar = require('./src/routes/posts/UploadAvatar')
const ConnectMongo = require('./databases/ConnectMongo')
const { InsertMessage, GetMessage } = require('./controllers/MessageController')
const MessageCollection = require('./model/Message')
const GetMessageByTarget = require('./src/routes/gets/GetMessageByTarget')
const io = new Server(server);
const bodyParser = require('body-parser')
const AddUserRoute = require('./src/routes/posts/AddUser')
const CheckLoginExpressRoute = require('./src/routes/posts/CheckLoginExpressRoute')
const AddUser = require('./src/routes/AddUser')
const PORT = 3000

//public file
app.use(express.static(path.join(__dirname, './public')));

app.engine('hbs', handlebars.engine({
     extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "/src/views"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use('/user', AddUser)

//connect to mongo
ConnectMongo(mongoose)
//open connect
app.listen(PORT, (req, res) => {
     console.log('====================================');
     console.log(`START AT PORT ${PORT}`);
     console.log('====================================');
})
//init route
HomeRoute(app)
RegisterRoute(app)
LoginRoute(app)

SignupRoute(app, UserController)
CheckLoginRoute(app, UserController)

GetAllUserRoute(app)
UploadAvatar(app, upload)
GetMessageByTarget(app, MessageCollection)

//express web
AddUserRoute(app, UserController, upload)
CheckLoginExpressRoute.CheckLoginExpressRoute(app, UserController)
CheckLoginExpressRoute.ReLoginC(app)

//socket IO
io.listen(3002)

var listUserOnline = []


io.on("connection", async (socket) => {
     const count = io.engine.clientsCount;

     socket.on('initId', (id) => {
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
          const arrMessage = await GetMessage(optionGetMessage, MessageCollection)
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
     socket.on('room-broadcast', (data) => {

          console.log('data is: ' + data);
          socket.broadcast.emit('welcome', { message: data, userId: socket.id });
          console.log('====================================');
          console.log(socket.id);
          console.log('====================================');
     });
})

module.exports.PORT = PORT