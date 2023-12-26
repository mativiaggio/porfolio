import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../firebase.js";
import { getUsers } from "../database-manage.js";
import { adminPanelAlert } from "./alerts.js";

import "./signout.js";
import "./signup.js";
import "./alerts.js";

const requestedRol = "admin";
// console.log("admin-panel javascript");

function access_denied() {
  $("#admin-panel-container").html("");
  $("#admin-panel-container").getTemplate({
    template: "access-denied",
  });
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // adminPanelAlert("Login successful", "success");
    const uid = user.uid;
    const aUsers = await getUsers();
    const foundUser = aUsers.find((user) => user.userID === uid);
    if (foundUser && foundUser.rol == requestedRol) {
      $("#logout").show();
      $("#logout").click(function () {
        window.location.href = "admin-panel-signin.html";
      });
      // $("#admin-panel-content").html("");
      // await $("#admin-panel-content").getTemplate({
      //   template: "admin-panel-template",
      // });
    } else {
      $("#admin-panel-container").html("");
      $("#admin-panel-container").getTemplate({
        template: "access-denied",
        content: {},
      });
    }
  } else {
    access_denied();
    // window.location.href = "admin-panel-signin.html";
  }
});
