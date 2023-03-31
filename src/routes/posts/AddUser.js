const AddUserRoute = (app, UserController, upload) => {
     app.post("/add-user",upload.single('avatar'), async (req, res) => {
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
               res.send("ADD SUCCESS!")
          } catch (error) {
               res.send("ADD FAIL!"+error)
          }
     })
}

module.exports = AddUserRoute