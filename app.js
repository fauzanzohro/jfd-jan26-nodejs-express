const express = require("express");
const app = express();
const port = 3000;
const moment = require("moment");
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

app.get("/karyawan", async (req, res) => {
  res.render("karyawan/all", {
    req,
    data_karyawan: await require("./model/m_karyawan").get_semua_karyawan(),
  });
});

app.get("/karyawan/details/:id_kry", async (req, res) => {
  let id_kry = req.params.id_kry;
  res.render("karyawan/profil", {
    profil_karyawan: await require("./model/m_karyawan").get_1_karyawan(id_kry),
  });
});

app.get("/karyawan/hapus/:id_kry", async (req, res) => {
  let id_kry = req.params.id_kry;
  let proses_hapus =
    await require("./model/m_karyawan").hapus_1_karyawan(id_kry);
  if (proses_hapus.affectedRows > 0) {
    res.redirect("/karyawan");
  }
});

app.get("/karyawan/tambah", async (req, res) => {
  res.render("karyawan/form-tambah", {
    req: req,
    agama: await require("./model/m_agama").get_semua_agama(),
    jabatan: await require("./model/m_jabatan").get_semua_jabatan(),
  });
});

app.post("/karyawan/proses-tambah", async (req, res) => {
  try {
    let proses_tambah =
      await require("./model/m_karyawan").insert_1_karyawan(req);
    if (proses_tambah.affectedRows > 0) {
      res.redirect(
        "/karyawan?succes_msg=berhasil menambahkan input karyawan baru",
      );
    }
  } catch (error) {
    res.redirect(
      "/karyawan/tambah?error_msg=" + error.errorno + ":" + error.sqlMessege,
    );
  }
});

app.get("/karyawan/edit/:id_kry", async (req, res) => {
  let id_kry = req.params.id_kry;
  res.render("karyawan/form-edit", {
    req: req,
    moment: moment,
    agama: await require("./model/m_agama").get_semua_agama(),
    jabatan: await require("./model/m_jabatan").get_semua_jabatan(),
    data_karyawan: await require("./model/m_karyawan").get_1_karyawan(id_kry),
  });
});

app.post("/karyawan/proses-edit/:id_kry", async (req, res) => {
  try {
    let proses_tambah =
      await require("./model/m_karyawan").update_1_karyawan(req);
    if (proses_tambah.affectedRows > 0) {
      res.redirect("/karyawan?succes_msg=berhasil update karyawan baru");
    }
  } catch (error) {
    res.redirect(
      "/karyawan/edit/?error_msg=" + error.errorno + ":" + error.sqlMessege,
    );
  }
});

// app.use((req, res) => {
//   res.status(404).render("error");
// });

app.listen(port, () => {
  console.log(`Aplikasi Berjalan di port http://localhost:${port}`);
});
