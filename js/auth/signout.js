import { signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { auth } from "../firebase.js";
import { adminPanelAlert } from "./alerts.js";

const logout = $("#logout");

logout.click(async function () {
  await signOut(auth);
  adminPanelAlert("Signed out", "success");
});
