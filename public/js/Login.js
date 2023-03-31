// document.querySelector('#checkLogin').addEventListener('click', () => {
//      const data = {
//           email: document.querySelector('#emailLogin').value,
//           password: document.querySelector('#passwordLogin').value
//      }
//      fetch('/check-login', {
//           method: 'POST',
//           headers: {
//                'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//      })
//           .then(response => response.json())
//           .then(data => {
//                if (data.length > 0) {
//                     console.log(data);
//                     console.log("đăng nhập thành công");
//                     window.location.assign("http://www.mozilla.org")
//                }else {
//                     console.log("tk or mk incorrect");
//                }
//           })
//           .catch(error => {
//                console.error(error);
//           });

//      // fetch("http://localhost:3000/check-login", {
//      //      method: "POST",
//      //      body: "ABC"
//      // }).then(res => {
//      //      console.log("Request complete! response:", res);
//      // }).then(data => {
//      //      console.log(data);
//      // });
// })
const toastTrigger = document.getElementById('stateData').value
console.log(toastTrigger);
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger == "true") {
     console.log("show");
     const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
     toastBootstrap.show()
}


window.history.pushState({}, document.title, "/" + "login");