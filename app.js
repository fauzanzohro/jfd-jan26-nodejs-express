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
app.get("/pengalaman", (req, res) => {
  let namaLengkap = "Fauzan Zohro";
  //1. data harus di kirim ke view
  //2. data harus di panggil di dalam view
  res.render("detail-pengalaman", {
    nama: namaLengkap,
    alamat: "Lbuklinggau",
    posisi: "programer",
    perusahaan: "PT Indofood Sedap",
    gaji: 1100000,
  });
});

// syncronous =berjalan secara berurutan
// asyncronous =berjalan secara tidak berurutan

app.get("/karyawan", async (req, res) => {
  res.render("karyawan/all", {
    data_karyawan: await require("./model/m_karyawan").get_semua_karyawan(),
  });
});

app.get("/karyawan/details/:id_kry", async (req, res) => {
  let id_kry = req.params.id_kry;
  res.render("karyawan/profil", {
    profil_karyawan: await require("./model/m_karyawan").get_1_karyawan(id_kry),
  });
});

// app.use((req, res) => {
//   res.status(404).render("error");
// });

app.listen(port, () => {
  console.log(`Aplikasi Berjalan di port http://localhost:${port}`);
});
