const express = require('express')
const MessageController = require('../../../controllers/MessageController')
const app = require('../UserRoute')

const getMessageByUserSendIdAndUserTargetId = (app) => {
     app.post('/get-message-room-broadcast', async (req, res) => {
          console.log("BODY: "+req.body);
          const listMessage =
               await MessageController.getMessageByUserSendIdAndUserTargetId(
                    req.body.idUserGet,
                    req.body.idUserSend
               )
          res.send(listMessage)
     })
}

module.exports.getMessageByUserSendIdAndUserTargetId = getMessageByUserSendIdAndUserTargetId