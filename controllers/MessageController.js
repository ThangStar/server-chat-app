const InsertMessage = async (data, messageCollection) => {
     console.log("DATA: "+await data);
     const objectMessage = JSON.parse(data)
     await messageCollection.insertMany([{
          message: objectMessage.message,
          idUser: objectMessage.idUser,
          target: objectMessage.target
     }])
}

const GetMessage = async (option, messageCollection) => {
     const arrMessage = await messageCollection.find(option)
     return arrMessage
}

module.exports.InsertMessage = InsertMessage
module.exports.GetMessage = GetMessage