const mysql = require("./db");

const DetailExportInvoice = function (detailExportInvoice) {
  this.so_luong_xuat = detailExportInvoice.soluongxuat;
  this.hinh_anh = detailExportInvoice.hinhanh;
  this.id_sp = detailExportInvoice.idsp;
  this.id_hdx = detailExportInvoice.idhdx;
  this.id_ms = detailExportInvoice.idms;
  this.id_kt = detailExportInvoice.idkt;
  this.ten_ms = detailExportInvoice.tenms;
  this.ten_kt = detailExportInvoice.tenkt;
  this.giam_gia = detailExportInvoice.giam_gia;
};

DetailExportInvoice.createDetailExportInvoice = (
  newDetailExportInvoice,
  result
) => {
  mysql.query(
    "INSERT INTO chi_tiet_hdx SET ?",
    newDetailExportInvoice,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
      }
      console.log("Create new detailExportInvoice");
      result(null, res);
    }
  );
    // console.log(`UPDATE chi_tiet_hdn set so_luong_nhap = so_luong_nhap - ${newDetailExportInvoice.so_luong_xuat} WHERE chi_tiet_hdn.id_th='${newDetailExportInvoice.id_ms}' AND chi_tiet_hdn.id_lsp = '${newDetailExportInvoice.id_lsp}' AND chi_tiet_hdn.id_sp = '${newDetailExportInvoice.id_sp}' AND chi_tiet_hdn.id_hdn = '${newDetailExportInvoice.id_hdx}'`);
  mysql.query(
    `UPDATE chi_tiet_hdn set so_luong_nhap = (so_luong_nhap - ${newDetailExportInvoice.so_luong_xuat}) WHERE chi_tiet_hdn.id_th='${newDetailExportInvoice.id_ms}' AND chi_tiet_hdn.id_lsp = '${newDetailExportInvoice.id_kt}' AND chi_tiet_hdn.id_sp = '${newDetailExportInvoice.id_sp}';`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
      }
      console.log("Create new detailExportInvoice");
      result(null, res);
    }
  );
};

DetailExportInvoice.getList = (result) => {
  mysql.query("SELECT id_hdx FROM chi_tiet_hdx", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
    }
    result(null, res);
  });
};

DetailExportInvoice.getListAll = (idhdx, result) => {
  mysql.query(
    `SELECT * FROM chi_tiet_hdx INNER JOIN hoa_don_xuat on chi_tiet_hdx.id_hdx = hoa_don_xuat.id_hdx INNER JOIN san_pham ON chi_tiet_hdx.id_sp = san_pham.id_sp WHERE chi_tiet_hdx.id_hdx = '${idhdx}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
      }
      result(null, res);
    }
  );
};

DetailExportInvoice.totalProductSell = (dateStart, dateEnd, status, result) => {
  mysql.query(
    `SELECT SUM(so_luong_xuat) as tong_so_luong  FROM giao_hang INNER JOIN chi_tiet_hdx ON chi_tiet_hdx.id_hdx = giao_hang.id_hdx WHERE giao_hang.trang_thai_gh = '${status}' AND giao_hang.ngay_gh <='${dateEnd}' && giao_hang.ngay_gh >='${dateStart}'`,
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

DetailExportInvoice.sumNumberProduct = (status, result) => {
  mysql.query(
    `SELECT SUM(so_luong_xuat) as tong_so_luong FROM hoa_don_xuat INNER JOIN chi_tiet_hdx ON chi_tiet_hdx.id_hdx = hoa_don_xuat.id_hdx WHERE hoa_don_xuat.trang_thai = '${status}'`,
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

DetailExportInvoice.sumNumber = (idsp, result) => {
  mysql.query(
    `SELECT SUM(chi_tiet_hdx.so_luong_xuat) as so_luong_xuat FROM chi_tiet_hdx WHERE chi_tiet_hdx.id_sp = '${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
      }
      result(null, res);
    }
  );
};

DetailExportInvoice.getProduct = (data, result) => {
  mysql.query(
    `SELECT * FROM chi_tiet_hdx INNER JOIN san_pham ON chi_tiet_hdx.id_sp = san_pham.id_sp WHERE chi_tiet_hdx.id_ms='${data.idms}' AND chi_tiet_hdx.id_kt='${data.idkt}' AND chi_tiet_hdx.id_sp ='${data.idsp}' AND chi_tiet_hdx.id_hdx='${data.idhdx}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
      }
      result(null, res);
    }
  );
};

module.exports = DetailExportInvoice;
