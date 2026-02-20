const { promiseImpl } = require("ejs");
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jfd",
});
db.connect();
module.exports = {
  get_semua_karyawan: function () {
    let sql = mysql.format("SELECT * FROM karyawan");
    return new Promise(function (resolve, reject) {
      db.query(sql, function (errorSql, hasil) {
        if (errorSql) {
          reject(errorSql);
        } else {
          resolve(hasil);
        }
      });
    });
  },
  get_1_karyawan: function (id_kry) {
    let sql = mysql.format("SELECT * FROM karyawan WHERE id =?", [id_kry]);
    return new Promise(function (resolve, reject) {
      db.query(sql, function (errorSql, hasil) {
        if (errorSql) {
          reject(errorSql);
        } else {
          resolve(hasil);
        }
      });
    });
  },

  hapus_1_karyawan: function (id_kry) {
    let sql = mysql.format("DELETE FROM karyawan WHERE id =?", [id_kry]);
    return new Promise(function (resolve, reject) {
      db.query(sql, function (errorSql, hasil) {
        if (errorSql) {
          reject(errorSql);
        } else {
          resolve(hasil);
        }
      });
    });
  },

  insert_1_karyawan: function (req) {
    let sql = mysql.format("INSERT INTO karyawan SET ?", [
      {
        nama: req.body.form_nama,
        tanggal_lahir: req.body.form_tgl_lahir,
        jenis_kelamin: req.body.form_gender,
        alamat: req.body.form_alamat,
        jabatan_id: req.body.form_jabatan,
        agama_id: req.body.form_agama,
      },
    ]);
    return new Promise(function (resolve, reject) {
      db.query(sql, function (errorSql, hasil) {
        if (errorSql) {
          reject(errorSql);
        } else {
          resolve(hasil);
        }
      });
    });
  },
};
