import { getUsers } from "../database-manage.js";
import { getTemplate } from "../getTemplate.js";

export const signinCheck = async (user, rol) => {
  if (user) {
    const uid = user.uid;

    const aUsers = await getUsers();

    const foundUser = aUsers.find((user) => user.userID === uid);

    if (foundUser && foundUser.rol == rol) {
      $("#logout").show();
      return await getTemplate("../templates/admin-panel.html");
    } else {
      return "<h1>Usted no posee permisos de administrador</h1>";
    }
  } else {
    $("#logout").hide();
  }
};
