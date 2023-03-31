const UserCollection = require('../model/User')
const addUser = (data = new Array()) => {
     UserCollection.insertMany(data)
}
const checkLogin = async (data = Object) => {
     const res = await UserCollection.where(data)
     console.log(res);
     return res
}

const getAllUser = () => {
     const listUser = UserCollection.find()
     return listUser
}

const updateUser = async (id = new String, userObj = new Object) => {
     try {
          db.coll.update({ "_id": 1 }, userObj)
          return true
     } catch (error) {
          return false
     }
}

module.exports.addUser = addUser
module.exports.checkLogin = checkLogin
module.exports.getAllUser = getAllUser
module.exports.updateUser = updateUser


