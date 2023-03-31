const SignupRoute = (app, UserController) => {
     app.post("/signup", async (req, res) => {
          try {
               console.log(req.body);
               const data = [{
                    gender: req.body.gender,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: "default-avatar.jpg",
                    fullname: req.body.fullname
               }]
               await UserController.addUser(data)
               res.send("ADD SUCCESS!")
          } catch (error) {
               res.send("ADD FAIL!")
          }
     })
}

module.exports = SignupRoute