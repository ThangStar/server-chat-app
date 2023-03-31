const mongoose = require('mongoose')


const message = new mongoose.Schema({
     idUser: {
          type: String,
          required: true
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