const { default: mongoose } = require('mongoose')
const UserCollection = require('../model/User')
const { ObjectId } = require('mongodb')
const MessageCollection = require('../model/Message')
const addUser = (data = new Array()) => {
     UserCollection.insertMany(data)
}
const checkLogin = async (data = Object) => {
     const res = await UserCollection.where(data)
     console.log(res);
     return res
}

const getAllUser = async () => {
     const listUser = await UserCollection.find({})
     return listUser.reverse()
}

const updateUser = async (userObj = new Object) => {
     console.log("DATA UPDATE: " + userObj);
     try {

          await UserCollection.updateOne(
               { _id: new ObjectId(userObj._id) },
               { $set: userObj }
          );
          return true
     } catch (error) {
          console.log(error);
          return false
     }
}

const deleteOneById = async (id = new Number) => {
     try {
          const result = await UserCollection.deleteOne({ _id: id })
          return result.deletedCount > 0
     } catch (error) {
          console.log("ERROR DELETE" + error);
          return false
     }
}

const getManyUserChatedById = async (id = new String) => {
     try {
          const listMessageChated = await MessageCollection.find(
               { $or: [{ idUserSend: id }, { idUserGet: id }] }
          )
          var listIdUserChated = []
          await listMessageChated.map(it => {
               if (it.idUserSend != id) {
                    listIdUserChated.push({ _id: it.idUserSend })
               } else {
                    listIdUserChated.push({ _id: it.idUserGet })
               }
          });

          const listUser = await UserCollection.find(
               {
                    $or: listIdUserChated
               }
          )
          return listUser
     } catch (error) {
          console.log('error' + error);
          return []
     }
}

module.exports.addUser = addUser
module.exports.checkLogin = checkLogin
module.exports.getAllUser = getAllUser
module.exports.updateUser = updateUser
module.exports.deleteOneById = deleteOneById
module.exports.getManyUserChatedById = getManyUserChatedById



