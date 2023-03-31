const CheckLoginRoute = (app, UserController) => {
     app.post("/check-login", async (req, res) => {
          try {
               console.log(req.body);
               const data = {
                    email: req.body.email,
                    password: req.body.password
               }
               const results = await UserController.checkLogin(data)
               console.log("results: " + results);
               if (results.length > 0) {
                    console.log("đăng nhập thành công!");
                    res.send(results[0])
                    // res.render("Home")
                    console.log('login success!');

               } else {
                    console.log('login fail');
                    res.send({})
               }

          } catch (error) {
               res.send("ERROR" + error)

          }

     })
}

module.exports = CheckLoginRoute