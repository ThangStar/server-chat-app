const RegisterRoute = (app) => {
     app.get("/register", (req, res) => {
          res.render("Register", {
               layout: 'AuthLayout.hbs'
          })
     })
}

module.exports = RegisterRoute