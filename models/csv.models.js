const mysql = require("./db");

const CSVproduct = function (product) {
  this.gia_ban_sp = product.gia_ban_sp;
  this.ten_sp = product.ten_sp;
  this.thong_tin_sp = product.thong_tin_sp;
  this.id_lsp = product.id_lsp;
  this.id_th = product.id_th;
};

CSVproduct.createProductCsv = (newProduct) => {
  return mysql.query("INSERT INTO san_pham SET ?", newProduct);
};
CSVproduct.getId = (result) => {
  mysql.query(
    "SELECT id_sp FROM san_pham ORDER BY SUBSTRING(id_sp,4)*1 DESC LIMIT 1",
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Get id product");
      result(null, res);
    }
  );
};

CSVproduct.createDetailProductCsv = (newProduct) => {
  return mysql.query("INSERT INTO chi_tiet_sp SET ?", newProduct);
};
CSVproduct.createImage = (newProduct) => {
  return mysql.query("INSERT INTO hinh_anh SET ?", newProduct);
};

module.exports = CSVproduct;
