import { getUsers } from "../database-manage.js";

export const signinCheck = async (user, rol) => {
  if (user) {
    const uid = user.uid;

    const aUsers = await getUsers();

    const foundUser = aUsers.find((user) => user.userID === uid);

    if (foundUser && foundUser.rol == rol) {
      $("#logout").show();

      $("#admin-panel-content").html("");
      await $("#admin-panel-content").getTemplate({
        template: "admin-panel",
      });
    } else {
      return "<h1>Usted no posee permisos de administrador</h1>";
    }
  } else {
    $("#logout").hide();

    $("#admin-panel-content").html("");

    await $("#admin-panel-content").getTemplate({
      template: "signin-form",
    });
  }
};
