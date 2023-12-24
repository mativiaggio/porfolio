import { auth } from "../firebase.js";
import { adminPanelAlert } from "./alerts.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { addUser } from "../database-manage.js";

$("#signup-form").on("submit", async function (e) {
  e.preventDefault();

  const email = $("#signup-email").val();
  const password = $("#signup-password").val();

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredentials.user.uid;
    addUser(email, userId);

    adminPanelAlert("Signup successful", "success");
  } catch (error) {
    console.log(error);
    adminPanelAlert("Signup error", "error");
  }
});
