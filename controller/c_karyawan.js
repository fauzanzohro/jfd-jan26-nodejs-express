const moment = require("moment");
let m_karyawan = require("../model/m_karyawan");
let m_agama = require("../model/m_agama");
let m_jabatan = require("../model/m_jabatan");

module.exports = {
  index: async (req, res) => {
    res.render("karyawan/all", {
      req,
      data_karyawan: await m_karyawan.get_semua_karyawan(),
    });
  },

  detail: async (req, res) => {
    let id_kry = req.params.id_kry;
    res.render("karyawan/profil", {
      profil_karyawan: await m_karyawan.get_1_karyawan(id_kry),
    });
  },
  hapus: async (req, res) => {
    let id_kry = req.params.id_kry;
    let proses_hapus = await m_karyawan.hapus_1_karyawan(id_kry);
    if (proses_hapus.affectedRows > 0) {
      res.redirect("/karyawan");
    }
  },
  tambah: async (req, res) => {
    res.render("karyawan/form-tambah", {
      req: req,
      agama: await m_agama.get_semua_agama(),
      jabatan: await m_jabatan.get_semua_jabatan(),
    });
  },

  proses_tambah: async (req, res) => {
    try {
      let proses_tambah = await m_karyawan.insert_1_karyawan(req);
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
  },
  edit: async (req, res) => {
    let id_kry = req.params.id_kry;
    res.render("karyawan/form-edit", {
      req: req,
      moment: moment,
      agama: await m_agama.get_semua_agama(),
      jabatan: await m_jabatan.get_semua_jabatan(),
      data_karyawan: await m_karyawan.get_1_karyawan(id_kry),
    });
  },

  proses_edit: async (req, res) => {
    try {
      let proses_tambah = await m_karyawan.update_1_karyawan(req);
      if (proses_tambah.affectedRows > 0) {
        res.redirect("/karyawan?succes_msg=berhasil update karyawan baru");
      }
    } catch (error) {
      res.redirect(
        "/karyawan/edit/?error_msg=" + error.errorno + ":" + error.sqlMessege,
      );
    }
  },
};
