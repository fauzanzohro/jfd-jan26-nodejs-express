const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs"); //setting penggunaan template engine
app.set("views", "./view"); // setting penggunaan folder untuk melihat html

app.get("/", (req, res) => {
  res.render("beranda");
});
app.get("/profil", (req, res) => {
  res.render("profil");
});
app.use((req, res) => {
  res.status(404).send("maaf url kamu salah");
});
app.listen(port, () => {
  console.log(`Aplikasi Berjalan di port http://localhost:${port}`);
});
