import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { adminPanelAlert } from "./alerts.js";

$("#signin-form").on("submit", async function (e) {
  e.preventDefault();

  const email = $("#signin-email").val();
  const password = $("#signin-password").val();

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    adminPanelAlert("Login successful", "success");
    window.location.href = "admin-panel.html";
  } catch (error) {
    console.log(error);
    adminPanelAlert("Error", "error");
  }
});

let eye = $("#eye");
let eyeOff = $("#eye-off");
let passwordInput = $("#signin-password");

eye.click(function () {
  eye.hide();
  eyeOff.show();
  passwordInput.attr("type", "text");
});

eyeOff.click(function () {
  eyeOff.hide();
  eye.show();
  passwordInput.attr("type", "password");
});
