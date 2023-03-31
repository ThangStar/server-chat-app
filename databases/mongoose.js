const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://akthangdz:84264@dbchat.s0gyqc3.mongodb.net/db_chat_app")
  .then(() => {
    console.log('connect success');
  }).catch(e => {
    console.log('connect fail ' + e);
  })

// const user = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String,
//     required: true
//   },
//   avatar: {
//     type: String,
//     required: true
//   }
// })

// const UserCollection = new mongoose.model("users", user)


const message = new mongoose.Schema({
  idUser: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const messageCollection = new mongoose.model("message", message)

  module.exports.UserCollection = UserCollection
  module.exports.messageCollection = messageCollection
  module.exports.mongoose = mongoose


