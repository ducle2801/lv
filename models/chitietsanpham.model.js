const mysql = require("./db");

const DetailProduct = function (detailProduct) {
  this.id_sp = detailProduct.idsp;
  this.id_kt = detailProduct.idkt;
  this.id_ms = detailProduct.idms;
};

DetailProduct.createDetailProduct = (newDetailProduct, result) => {
  mysql.query("INSERT INTO chi_tiet_sp SET ?", newDetailProduct, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Tạo chi tiết sản phẩm thành công");
    result(null, res);
  });
};
DetailProduct.updateDetailproduct = (data, result) => {
  console.log(data);
  mysql.query(
    `INSERT INTO chi_tiet_sp(so_luong_sp, id_sp, id_ms, id_kt) VALUES ('${data.soluong}','${data.idsp}','${data.idms}','${data.idkt}');`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Tạo chi tiết sản phẩm thành công");
      result(null, res);
    }
  );
};

DetailProduct.removeUpdate = (idsp, result) => {
  mysql.query(
    `DELETE FROM chi_tiet_sp WHERE chi_tiet_sp.id_sp= '${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Tạo chi tiết sản phẩm thành công");
      result(null, res);
    }
  );
};

DetailProduct.getList = (idsp, result) => {
  mysql.query(
    `SELECT * from chi_tiet_sp INNER JOIN kich_thuoc ON chi_tiet_sp.id_kt = kich_thuoc.id_kt INNER JOIN mau_sac ON chi_tiet_sp.id_ms = mau_sac.id_ms WHERE id_sp='${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách chi tiết sản phẩm thành công");
      result(null, res);
    }
  );
};

DetailProduct.getAllNumber = (result) => {
  mysql.query(
    "SELECT SUM(so_luong_nhap) as so_luong_sp FROM chi_tiet_hdn",
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách chi tiết sản phẩm thành công");
      result(null, res);
    }
  );
};
// `SELECT * from chi_tiet_sp INNER JOIN kich_thuoc ON chi_tiet_sp.id_kt = kich_thuoc.id_kt INNER JOIN mau_sac ON chi_tiet_sp.id_ms = mau_sac.id_ms WHERE chi_tiet_sp.id_sp='${idsp}' AND chi_tiet_sp.id_ms='${idms}'`,
DetailProduct.getListColor = (idsp, idms, result) => {
  mysql.query(
    `SELECT * from loai_san_pham INNER JOIN san_pham ON san_pham.id_th= loai_san_pham.id_th WHERE san_pham.id_sp ='${idsp}' AND san_pham.id_th='${idms}';`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách chi tiết sản phẩm thành công");
      result(null, res);
    }
  );
};
// SELECT * from chi_tiet_sp INNER JOIN kich_thuoc ON chi_tiet_sp.id_kt = kich_thuoc.id_kt INNER JOIN mau_sac ON chi_tiet_sp.id_ms = mau_sac.id_ms WHERE chi_tiet_sp.id_sp='${idsp}' AND chi_tiet_sp.id_kt='${idkt}' AND chi_tiet_sp.id_ms='${idms}'
DetailProduct.getNumberProduct = (idsp, idkt, idms, result) => {
  // console.log(`SELECT * from chi_tiet_hdn INNER JOIN thuong_hieu ON chi_tiet_hdn.id_th = thuong_hieu.id_th INNER JOIN loai_san_pham ON chi_tiet_hdn.id_lsp = loai_san_pham.id_lsp WHERE chi_tiet_hdn.id_sp='${idsp}' AND chi_tiet_hdn.id_lsp='${idkt}' AND chi_tiet_hdn.id_th='${idms}'`);
  mysql.query(
    `SELECT * from chi_tiet_hdn INNER JOIN thuong_hieu ON chi_tiet_hdn.id_th = thuong_hieu.id_th INNER JOIN loai_san_pham ON chi_tiet_hdn.id_lsp = loai_san_pham.id_lsp WHERE chi_tiet_hdn.id_sp='${idsp}' AND chi_tiet_hdn.id_lsp='${idkt}' AND chi_tiet_hdn.id_th='${idms}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

DetailProduct.getProductBuyNow = (newInfo, result) => {
  mysql.query(
    `SELECT * from chi_tiet_sp INNER JOIN kich_thuoc ON chi_tiet_sp.id_kt = kich_thuoc.id_kt INNER JOIN mau_sac ON chi_tiet_sp.id_ms = mau_sac.id_ms INNER JOIN san_pham ON san_pham.id_sp = chi_tiet_sp.id_sp LEFT JOIN khuyen_mai ON khuyen_mai.id_sp = san_pham.id_sp WHERE (chi_tiet_sp.id_sp ='${newInfo.idsp}' AND chi_tiet_sp.id_ms ='${newInfo.idms}' AND chi_tiet_sp.id_kt ='${newInfo.idkt}')`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

DetailProduct.removeNumberProduct = (newInfo, result) => {
  mysql.query(
    `UPDATE chi_tiet_sp SET so_luong_sp=(so_luong_sp-${newInfo.so_luong_xuat}) WHERE chi_tiet_sp.id_sp ='${newInfo.id_sp}' AND chi_tiet_sp.id_ms ='${newInfo.id_ms}' AND chi_tiet_sp.id_kt ='${newInfo.id_kt}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

DetailProduct.addNumberProduct = (newInfo, result) => {
  mysql.query(
    `UPDATE chi_tiet_hdn SET so_luong_nhap=(so_luong_nhap+${newInfo.so_luong_xuat}) WHERE chi_tiet_hdn.id_sp ='${newInfo.id_sp}' AND chi_tiet_hdn.id_th ='${newInfo.id_ms}' AND chi_tiet_hdn.id_lsp ='${newInfo.id_kt}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

DetailProduct.updateNumberProduct = (newInfo, result) => {
  console.log(newInfo);
  mysql.query(
    `UPDATE chi_tiet_hdn SET so_luong_nhap=(so_luong_nhap+${newInfo.soluong}) WHERE chi_tiet_hdn.id_sp ='${newInfo.idsp}' AND chi_tiet_hdn.id_th ='${newInfo.mausac}' AND chi_tiet_hdn.id_lsp ='${newInfo.kichthuoc}';`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

DetailProduct.getNumberOneProduct = (product, result) => {
  mysql.query(
    `SELECT * from chi_tiet_sp INNER JOIN kich_thuoc ON chi_tiet_sp.id_kt = kich_thuoc.id_kt INNER JOIN mau_sac ON chi_tiet_sp.id_ms = mau_sac.id_ms INNER JOIN san_pham ON san_pham.id_sp = chi_tiet_sp.id_sp LEFT JOIN khuyen_mai ON khuyen_mai.id_sp = san_pham.id_sp WHERE (chi_tiet_sp.id_sp ='${product.idsp}' AND chi_tiet_sp.id_ms ='${product.idms}' AND chi_tiet_sp.id_kt ='${product.idkt}')`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = DetailProduct;
