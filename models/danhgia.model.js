const mysql = require("./db");

const Review = function (review) {
  this.so_sao = review.sosao;
  this.noi_dung_dg = review.noidung;
  this.ngay_dg = review.ngaydg;
  this.id_hdx = review.idhdx;
  this.ma_sp = review.idsp;
  this.ma_th = review.idms;
  this.ma_lsp = review.idkt;
};

Review.createReview = (newReview, result) => {
  mysql.query("INSERT INTO danh_gia SET ?", newReview, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new review");
    result(null, res);
  });
};

Review.getIdReview = (result) => {
  mysql.query("SELECT id_dg FROM danh_gia ORDER BY id_dg DESC LIMIT 1", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get id success!");
    result(null, res);
  });
};

Review.getListReview = (result) => {
  mysql.query("SELECT * FROM danh_gia INNER JOIN san_pham ON san_pham.id_sp = danh_gia.ma_sp", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách đánh giá thành công");
    result(null, res);
  });
};

Review.getReview = (idhdx, result) => {
  mysql.query(`SELECT * FROM danh_gia WHERE id_hdx='${idhdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách đánh giá thành công");
    result(null, res);
  });
};

Review.getReviewProduct = (idsp, result) => {
  mysql.query(
    `SELECT danh_gia.*, san_pham.* FROM hoa_don_xuat INNER JOIN danh_gia ON hoa_don_xuat.id_hdx = danh_gia.id_hdx INNER JOIN chi_tiet_hdx ON hoa_don_xuat.id_hdx = chi_tiet_hdx.id_hdx INNER JOIN san_pham ON chi_tiet_hdx.id_sp = san_pham.id_sp WHERE san_pham.id_sp='${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách đánh giá sản phẩm thành công");
      result(null, res);
    },
  );
};
Review.getdanhgia = (idsp, result) => {
  mysql.query(
    `SELECT danh_gia.*, hinh_anh_danh_gia.* FROM danh_gia INNER JOIN hinh_anh_danh_gia ON hinh_anh_danh_gia.id_dg = danh_gia.id_dg WHERE danh_gia.ma_sp='${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách đánh giá sản phẩm thành công");
      result(null, res);
    },
  );
};

Review.getReviewInvoice = (idhdx, result) => {
  mysql.query(`SELECT * FROM danh_gia WHERE id_hdx='${idhdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách đánh giá sản phẩm thành công");
    result(null, res);
  });
};

Review.getOneReview = (data, result) => {
  mysql.query(
    `SELECT * FROM danh_gia WHERE id_hdx='${data.idhdx}' AND ma_sp='${data.idsp}' AND ma_th='${data.idms}' AND ma_lsp='${data.idkt}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách đánh giá sản phẩm thành công");
      result(null, res);
    },
  );
};

Review.updateStatus = (status, iddg, result) => {
  mysql.query(`UPDATE danh_gia SET trang_thai_dg='${status}' WHERE id_dg='${iddg}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách đánh giá sản phẩm thành công");
    result(null, res);
  });
};

Review.deleteReview =(iddg,result)=>{
  mysql.query(`DELETE FROM danh_gia WHERE danh_gia.id_dg = '${iddg}'`,(err,res)=>{
    if(err){
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Xoa danh gia ok");
    result(null, res);
  } );
}

module.exports = Review;
