const CheckLoginExpressRoute = (app, UserController) => {
     app.post("/login-c", async (req, res, session) => {
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
                    res.redirect('/')

               } else {
                    console.log('login fail');
                    const error = JSON.stringify({
                         title: 'Đăng nhập',
                         errorPass: "Tài khoản hoặc mật khẩu không chính xác!",
                         isShowError: "true",
                         layout: 'AuthLayout.hbs'
                    })
                    var errorParam = encodeURIComponent(error);
                    res.redirect('/login?error=' + errorParam,)
               }

          } catch (error) {
               res.send("ERROR" + error)

          }

     })
}

const ReLoginC = (app) => {

}


module.exports.CheckLoginExpressRoute = CheckLoginExpressRoute
module.exports.ReLoginC = ReLoginC
