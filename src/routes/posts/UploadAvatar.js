const { updateUser } = require("../../../controllers/UserController");
const UserCollection = require("../../../model/User");
const UserController = require('../../../controllers/UserController')
const UploadAvatar = async (app, upload) => {
     app.post('/upload-avatar', upload.single('avatar'), async function (req, res) {
          // Handle upload success
          const dataUpdate = {
               _id: req.body.id,
               email: req.body.email,
               fullname: req.body.fullname
          }
          if(req.file != undefined){
               dataUpdate.avatar = req.file.filename
          }
          const isSuccess = await updateUser(dataUpdate)
          if(isSuccess){
               res.redirect("/") 
          }else{
               res.send('Image upload fail!') 
          }
     })
}
module.exports = UploadAvatar