const CSVproduct = require("../models/csv.models");
const csvfile = require("csvtojson");

module.exports = {
  createCsv: async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const data = req.file.buffer.toString();

    const jsonArray = await csvfile().fromString(data);
    try {
      for (let index = 0; index < jsonArray.length; index++) {
        const element = jsonArray[index];
        const csvproduct = new CSVproduct({
          ten_sp: element.tensp,
          gia_ban_sp: element.giaban,
          thong_tin_sp: element.thongtinsp,
          id_lsp: element.loaisp,
          id_th: element.thuonghieu,
        });
        CSVproduct.createProductCsv(csvproduct);
      }
      CSVproduct.getId((err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    } catch (error) {}
  },

  createdetailCsv: async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const data = req.file.buffer.toString();
    const jsonArray = await csvfile().fromString(data);
    try {
      for (let index = 0; index < jsonArray.length; index++) {
        const element = jsonArray[index];
        const csvproduct = {
          id_sp: element.idsp,
          id_ms: element.mausac,
          id_kt: element.kichthuoc,
        };
        CSVproduct.createDetailProductCsv(csvproduct);
      }
      res.status(200).send();
    } catch (error) {}
  },
  createImageCsv: async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const data = req.file.buffer.toString();
    const jsonArray = await csvfile().fromString(data);
    try {
      for (let index = 0; index < jsonArray.length; index++) {
        const element = jsonArray[index];
        const csvproduct = {
          id_sp: element.idsp,
          hinh_anh_sp: element.hinhanh,
        };
        CSVproduct.createImage(csvproduct);
      }
      res.status(200).send();
    } catch (error) {}
  },

  //   getPosition: (req, res) => {
  //     if (!req.params) {
  //       res.status(400).send({
  //         message: "Content can not be empty!",
  //       });
  //     }

  //     Position.getPosition(req.params.id, (err, data) => {
  //       if (err) {
  //         res.status(500).send({
  //           message: err.message,
  //         });
  //       } else res.status(200).send(data);
  //     });
  //   },

  //   getListPosition: (req, res) => {
  //     Position.getListPosition((err, data) => {
  //       if (err) {
  //         res.status(500).send({
  //           message: err.message,
  //         });
  //       } else res.status(200).send(data);
  //     });
  //   },
};
