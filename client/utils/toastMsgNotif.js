import Toastify from "toastify-js";
export default function toastMsgNotif(message) {
  Toastify({
    // text: error.response?.data?.message || error.message,
    text: message,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      //   background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "black",
      fontWeight: "bold",
      background: "white",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
