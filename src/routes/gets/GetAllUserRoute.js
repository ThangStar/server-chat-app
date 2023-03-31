const { getAllUser } = require("../../../controllers/UserController")
const MessageCollection = require("../../../model/Message")

const GetAllUserRoute = (app) => {
     app.get("/get-all-user", async (req, res) => {
          const results = await getAllUser()
          res.send(results)
     })
}

module.exports = GetAllUserRoute