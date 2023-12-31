const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/khachhang.model");

dotenv.config();

module.exports = {
  createUser: (req, res) => {
    if (!req.body) { 
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      ngaytaotk: req.body.ngaytaotk,
    });

    User.createUser(user, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getUser: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    User.getUser(req.body.email, req.body.password, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        const dataUser = req.body;
        const accessToken = jwt.sign(dataUser, process.env.ACCESS_TOKEN_SECRET);
        if (data.length !== 0) {
          res.status(200).send({ dataUser: data, accessToken: accessToken });
        } else {
          res.status(401).send();
        }
      }
    });
  },

  checkUser: (req, res) => {
    User.getCheckuser(req.params.email, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  getOneUser: (req, res) => {
    User.getOneUser(req.params.id_kh, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
  getDetailUser: (req, res) => {
    User.getDetailUser(req.params.id_kh, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
  getMoneyUser: (req, res) => {
    User.getMoneyUser(req.params.id_kh, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
  getListClient: (req, res) => {
    User.getListClient((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  changePassword: (req, res) => {
    User.changePassword(req.params.email, req.body.password, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  updateStatusUser: (req, res) => {
    User.updateStatusUser(req.params.idkh, req.params.status, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
  updateMemberUser: (req, res) => {
    // console.log(req.params);
    User.updateMemberUser(req.params.idkh, req.params.type, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
};

