const messageCollection = require('../model/Message');
const { ObjectId } = require('mongodb');
const UserController = require('../controllers/UserController')
const InsertMessage = async (data, messageCollection) => {
     console.log("DATA: " + await data);
     const objectMessage = data
     await messageCollection.insertMany([{
          message: objectMessage.message,
          idUserSend: objectMessage.idUserSend,
          target: objectMessage.target,
          idUserGet: objectMessage.idUserGet
     }])
}

const GetMessage = async (option) => {
     const arrMessage = await messageCollection.find(option)
     return arrMessage
}

const getMessageByUserSendIdAndUserTargetId = async (idUserGet, idUserSend) => {

     const option = {
          $or: [
               {
                    $and: [
                         {
                              idUserGet: idUserGet
                         },
                         {
                              idUserSend: idUserSend
                         }
                    ],

               },
               {
                    $and: [
                         {
                              idUserGet: idUserSend
                         },
                         {
                              idUserSend: idUserGet
                         }
                    ]
               }
          ]
     }
     const arrMessage = await messageCollection.find(option)

     return arrMessage
}

//param is id current user => return listUserChated


module.exports.InsertMessage = InsertMessage
module.exports.GetMessage = GetMessage
module.exports.getMessageByUserSendIdAndUserTargetId = getMessageByUserSendIdAndUserTargetId
