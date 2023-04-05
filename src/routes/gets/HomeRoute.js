const HomeRoute = (app, UserController) => {
     app.get("/", async (req, res) => {
          const data = await UserController.getAllUser()
          res.status(200)
          res.header("Content-Type", "text/html"); 
          res.render("Home", {
               listUser: data.map(e => e.toJSON())
          })
     })
}

module.exports = HomeRoute