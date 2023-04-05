const mongoose = require('mongoose')


const message = new mongoose.Schema({
     idUserSend: {
          type: String,
          required: true
     },
     idUserGet: {
          type: String,
     },
     message: {
          type: String,
     },
     target: {
          type: String,
          required: true
     }
})

const MessageCollection = new mongoose.model("message", message)

module.exports = MessageCollection