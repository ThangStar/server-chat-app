const HomeRoute = (app) => {
     app.get("/", (req, res) => {
          res.render("Home")
     })
}

module.exports = HomeRoute