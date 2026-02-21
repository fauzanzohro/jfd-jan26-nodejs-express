const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
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
let c_karyawan = require("./controller/c_karyawan");

app.get("/karyawan", c_karyawan.index);

app.get("/karyawan/details/:id_kry", c_karyawan.detail);

app.get("/karyawan/hapus/:id_kry", c_karyawan.hapus);

app.get("/karyawan/tambah", c_karyawan.tambah);

app.post("/karyawan/proses-tambah", c_karyawan.proses_tambah);

app.get("/karyawan/edit/:id_kry", c_karyawan.edit);

app.post("/karyawan/proses-edit/:id_kry", c_karyawan.proses_edit);

// app.use((req, res) => {
//   res.status(404).render("error");
// });

app.listen(port, () => {
  console.log(`Aplikasi Berjalan di port http://localhost:${port}`);
});
