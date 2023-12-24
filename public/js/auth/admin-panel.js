import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../firebase.js";
import { signinCheck } from "./signinCheck.js";
import { getTemplate } from "../getTemplate.js";

import "./signout.js";
// import "./signin.js";
import "./signup.js";
import "./alerts.js";

const requestedRol = "admin";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const template = await signinCheck(user, requestedRol);

    $("#admin-panel-content").html(template);
  } else {
    signinCheck(user, requestedRol);
    $("#admin-panel-content").html("");

    const template = await getTemplate("../templates/signin-form.html");

    $("#admin-panel-content").html(template);
  }
});
