const { app } = require('../../ConfigApp');
const upload = require('../../upload/UploadImage');
const UserController = require('../../controllers/UserController')

app.post("/add",upload.single('avatar'), async (req, res) => {
     try {
          const data = [{
               gender: req.body.gender,
               email: req.body.email,
               password: req.body.password,
               avatar: req.file.filename,
               fullname: req.body.fullname,
               permission: req.body.permission
          }]
          console.log(req.body);
          console.log(data);

          await UserController.addUser(data)
          res.redirect('/')
     } catch (error) {
          res.send("ADD FAIL!"+error)
     }
})

app.post("/delete",upload.single('avatar'), async (req, res) => {
     try {
          const idUser = req.body.id
          console.log(req.body);
          const result = await UserController.deleteOneById(idUser)
          result ? res.redirect('/') : res.send("DELETE FAIL!")
     } catch (error) {
          res.send("DELETE FAIL!"+error)
     }
})



app.get("/info", async (req, res) => {
     
})

module.exports = app