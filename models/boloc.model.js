const mysql = require('./db');

const Filter = function (filter) {
  this.key = filter.key;
};

Filter.sortBy = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp ORDER BY gia_da_km ${key}`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
Filter.sortType = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp  WHERE id_lsp='${key}'`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
Filter.sortBySale = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp  WHERE khuyen_mai.gia_km != '' ORDER BY gia_da_km ${key}`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Filter.sortBrand = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp  WHERE id_th='${key}'`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
Filter.sortBrandSale = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp  WHERE id_th='${key}' and khuyen_mai.gia_km != ''`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
Filter.sortTypeSale = (key, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp WHERE id_lsp='${key}' and khuyen_mai.gia_km != '';`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
Filter.sortSize = (key, result) => {
  mysql.query(
    `SELECT * FROM chi_tiet_sp INNER JOIN san_pham ON san_pham.id_sp = chi_tiet_sp.id_sp WHERE chi_tiet_sp.id_kt IN ('${key}') ORDER BY SUBSTRING(san_pham.id_sp,4)*1 ASC;`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Filter.sortSizeBrand = (key, brand, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp JOIN chi_tiet_sp ON chi_tiet_sp.id_sp = san_pham.id_sp WHERE id_th='${brand}' AND chi_tiet_sp.id_kt IN ('${key}')`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Filter.sortSizeSale = (key, result) => {
  mysql.query(
    `SELECT * FROM chi_tiet_sp INNER JOIN san_pham ON san_pham.id_sp = chi_tiet_sp.id_sp INNER JOIN khuyen_mai ON khuyen_mai.id_sp = san_pham.id_sp WHERE chi_tiet_sp.id_kt IN ('${key}') and khuyen_mai.gia_km !='' ORDER BY SUBSTRING(san_pham.id_sp,4)*1 ASC;`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Filter.sortSizeBrandSale = (key, brand, result) => {
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km, IF(khuyen_mai.gia_km >0, (san_pham.gia_ban_sp - (san_pham.gia_ban_sp * khuyen_mai.gia_km/100)), san_pham.gia_ban_sp) as gia_da_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp JOIN chi_tiet_sp ON chi_tiet_sp.id_sp = san_pham.id_sp WHERE id_th='${brand}' AND chi_tiet_sp.id_kt IN ('${key}') AND khuyen_mai.gia_km != ''`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Filter.search = (key, result) => {
  console.log(key);
  mysql.query(
    `SELECT san_pham.*, khuyen_mai.gia_km FROM san_pham LEFT JOIN khuyen_mai ON san_pham.id_sp = khuyen_mai.id_sp WHERE san_pham.ten_sp LIKE '%${key}%' ORDER BY SUBSTRING(san_pham.id_sp,4)*1;`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Filter.rangePrice = (data, result) => {
  mysql.query(
    `SELECT * from A WHERE gia_da_km >= ${data[0]} AND gia_da_km <=${data[1]}`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
Filter.rangePriceSale = (data, result) => {
  mysql.query(
    `SELECT * from A WHERE gia_da_km >= ${data[0]} AND gia_da_km <=${data[1]} AND gia_km != ''`,
    (err, res) => {
      if (err) {
        console.log('ERROR: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Filter;
