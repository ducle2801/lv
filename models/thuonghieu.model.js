const mysql = require("./db");

const Brand = function (product) {
  this.ten_th = product.thuonghieu;
};

Brand.createBrand = (newBrand, result) => {
  mysql.query("INSERT INTO thuong_hieu SET ?", newBrand, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new brand");
    result(null, { ...newBrand });
  });
};

Brand.getBrand = (id, result) => {
  mysql.query(`SELECT * FROM thuong_hieu WHERE id_th='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new brand");
    result(null, res);
  });
};

Brand.getList = (result) => {
  mysql.query(
    `SELECT th.id_th, th.ten_th, FALSE AS isOpen,
    CONCAT('[', 
        GROUP_CONCAT(
            CONCAT('{"ten_loai": "', lsp.ten_lsp, '","id_loai": "', lsp.id_lsp, '"}')
            SEPARATOR ','
        ),
    ']') AS danh_sach_loai_san_pham
FROM thuong_hieu th
LEFT JOIN loai_san_pham lsp ON lsp.id_th = th.id_th
GROUP BY th.id_th, th.ten_th;
`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Select list brand");
      result(null, res);
    }
  );
};

Brand.deBrand = (idth, result) => {
  mysql.query(`DELETE FROM thuong_hieu WHERE id_th='${idth}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Brand;
