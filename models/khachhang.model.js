const mysql = require("./db");

const User = function (user) {
  this.email_kh = user.email;
  this.mat_khau_kh = user.password;
  this.ngay_tao_tk = user.ngaytaotk;
};

User.createUser = (newUser, result) => {
  mysql.query("INSERT INTO khach_hang SET ? ", newUser, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new user");
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getUser = (email, password, result) => {
  mysql.query(
    "SELECT * FROM khach_hang WHERE (email_kh=? && mat_khau_kh=?)",
    [email, password],
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }
      console.log("get user success");
      result(null, res);
    }
  );
};

User.getCheckuser = (email, result) => {
  mysql.query(
    `SELECT email_kh FROM khach_hang WHERE email_kh='${email}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      } else {
        console.log("check eamil user success");
        result(null, res);
      }
    }
  );
};

User.getOneUser = (id_kh, result) => {
  mysql.query(`SELECT * FROM khach_hang WHERE id_kh='${id_kh}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    } else {
      console.log("check eamil user success");
      result(null, res);
    }
  });
};
User.getDetailUser = (id_kh, result) => {
  mysql.query(`SELECT * FROM khach_hang WHERE id_kh='${id_kh}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    } else {
      console.log("check eamil user success");
      result(null, res);
    }
  });
};
User.getMoneyUser = (id_kh, result) => {
  mysql.query(`SELECT SUM(hoa_don_xuat.tong_tien_hdx) as tongtien FROM hoa_don_xuat INNER JOIN khach_hang ON khach_hang.id_kh = hoa_don_xuat.id_kh WHERE khach_hang.id_kh = '${id_kh}' and hoa_don_xuat.trang_thai ="Đã giao hàng";`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    } else {
      console.log("check eamil user success");
      result(null, res);
    }
  });
};

User.getListClient = (result) => {
  mysql.query(`SELECT * FROM khach_hang`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    } else {
      console.log("check eamil user success");
      result(null, res);
    }
  });
};

User.changePassword = (email, password, result) => {
  mysql.query(
    `UPDATE khach_hang SET mat_khau_kh='${password}' WHERE email_kh='${email}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      } else {
        console.log("change password user success");
        result(null, res);
      }
    }
  );
};

User.updateStatusUser = (idkh, status, result) => {
  mysql.query(
    `UPDATE khach_hang SET trang_thai_kh='${status}' WHERE id_kh='${idkh}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      } else {
        console.log("Success");
        result(null, res);
      }
    }
  );
};

User.updateMemberUser = (idkh, status, result) => {
  mysql.query(
    `UPDATE khach_hang SET thanh_vien='${status}' WHERE id_kh='${idkh}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      } else {
        console.log("Success");
        result(null, res);
      }
    }
  );
};

module.exports = User;
