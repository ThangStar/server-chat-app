const ConnectMongo = (mongoose) => {
     mongoose.connect("mongodb+srv://akthangdz:84264@dbchat.s0gyqc3.mongodb.net/db_chat_app")
     .then(() => {
          console.log('connect success');
     }).catch(e => {
          console.log('connect fail ' + e);
     })
}
module.exports = ConnectMongo