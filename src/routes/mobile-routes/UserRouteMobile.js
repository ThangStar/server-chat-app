const UserController = require('../../../controllers/UserController')
const CheckLogin = (app, UserController) => {
     app.post("/check-login-mb", async (req, res) => {
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

const getUserChatedByIdUser = async (app = express(), userController) => {
     app.post('/get-user-chated-by-id-mb', async (req, res) => {
          try {
               console.log( await req.body);
               const listMessage = await userController.getManyUserChatedById(req.body._id)
               res.send(listMessage)
          } catch (error) {
               res.send([])
          }
     })
}



module.exports.checkLogin = CheckLogin
module.exports.getUserChatedByIdUser = getUserChatedByIdUser
