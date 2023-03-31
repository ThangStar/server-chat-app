const ReLogin = (app) => {
     app.get("/login", (req, res) => {
          res.redirect('/login')

     })
}
const LoginRoute = (app) => {
     app.get("/login", (req, res) => {
          var isHaveParams = false
          console.log(req.query.error);

          try {
               console.log(JSON.parse(req.query.error));
               isHaveParams = true
          } catch (error) {
               
          }
          res.render("Login",isHaveParams? JSON.parse(req.query.error): {
               layout: 'AuthLayout.hbs'
          })

     })
}
module.exports.LoginRoute = LoginRoute
module.exports.ReLogin = ReLogin
