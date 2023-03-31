const mongoose = require('mongoose')

const user = new mongoose.Schema({
     fullname: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: { 
          type: String,
          required: true
     },
     gender: {
          type: String,
          required: true
     },
     avatar: {
          type: String,
          required: true
     },
     permission: {
          type: String,
          required: true,
          default: "user"
     }
})

const UserCollection = new mongoose.model("users", user)

module.exports = UserCollection