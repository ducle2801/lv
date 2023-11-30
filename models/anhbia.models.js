const mysql = require("./db");

const anhBia = function (anhbia) {
  this.ten_ab = anhbia.anhbia;
  this.id_th = anhbia.thuonghieu;
  this.loaiab = anhbia.loaiab;
};
anhBia.createImage = (newImage, result) => {
  mysql.query("INSERT INTO anh_bia SET ?", newImage, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new image");
    result(null, { ...newImage });
  });
};

anhBia.getBanner = (result) => {
  mysql.query("SELECT * FROM anh_bia ", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new image");
    result(null, res);
  });
};

anhBia.deleteBanner = (id, result) => {
  mysql.query(`DELETE FROM anh_bia WHERE id_ab='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("delete image");
    result(null, res);
  });
};

module.exports = anhBia;
