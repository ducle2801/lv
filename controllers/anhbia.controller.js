const Anhbia = require("../models/anhbia.models");
module.exports = {
  createImage: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    if (req.body.thuonghieu === "undefined" || req.body.page === "undefined") {
      for (let i = 0; i < req.files.length; i++) {
        const image = new Anhbia({
          anhbia: req.files[i].path,
          thuonghieu: null,
          loaiab: null,
        });

        Anhbia.createImage(image, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else res.status(200);
        });
      }
      res.status(200).send("success");
    } else {
      for (let i = 0; i < req.files.length; i++) {
        const image = new Anhbia({
          anhbia: req.files[i].path,
          thuonghieu: req.body.thuonghieu,
          loaiab: req.body.page,
        });

        Anhbia.createImage(image, (err, data) => {
          if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else res.status(200);
        });
      }
      res.status(200).send("success");
    }
  },

  getBanner: (req, res) => {
    Anhbia.getBanner((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  deleteBanner: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Anhbia.deleteBanner(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
