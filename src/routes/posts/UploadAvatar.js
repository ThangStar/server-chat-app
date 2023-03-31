const { updateUser } = require("../../../controllers/UserController");

const UploadAvatar = async (app, upload) => {
     app.post('/upload-avatar', upload.single('avatar'), async function (req, res) {
          // Handle upload success
          const dataUpdate = {
               _id: req.body.id,
               username: req.body.email,
               avatar: req.file.filename,
               fullname: req.body.fullname
          }
          console.log('body: ', req.body);
          console.log('dataUpdate: ', dataUpdate);
          const isSuccess = await updateUser(dataUpdate._id)
          isSuccess ? res.send('Image uploaded success!') : res.send('Image upload fail!') 
     })
}
module.exports = UploadAvatar