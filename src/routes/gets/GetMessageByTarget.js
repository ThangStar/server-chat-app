const { GetMessage } = require("../../../controllers/MessageController");

const GetMessageByTarget = async (app, MessageCollection) => {
     app.get("/get-message-by-target", async (req, res) => {
          const optionGetMessageByTarget = {
               target: 'public'
          }
          const arrMessage = await GetMessage(optionGetMessageByTarget, MessageCollection)
          console.log(await arrMessage);
          res.send(arrMessage)
     })
}

module.exports = GetMessageByTarget