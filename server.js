const express = require("express");
const path = require("path");

const app = express();

// Configuración para manejar rutas sin extensiones
app.use((req, res, next) => {
  if (path.extname(req.path) === "" && req.path.slice(-1) !== "/") {
    res.redirect(req.path + "/");
  } else {
    next();
  }
});

// Configuración para servir archivos estáticos desde el directorio 'public'
app.use(express.static("public"));
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

// Configuración para manejar rutas con extensiones
app.get("/:page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", req.params.page + ".html"));
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
