const Product = require("../models/sanpham.model");

module.exports = {
  createProduct: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const product = new Product({
      giaban: req.body.giaban,
      tensanpham: req.body.tensanpham,
      thongtinsanpham: req.body.thongtinsanpham,
      loaisanpham: req.body.loaisanpham,
      thuonghieu: req.body.thuonghieu,
    });

    Product.createProduct(product, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200);
    });
    Product.getId((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getProduct: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Product.getProduct(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  getDetail: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Product.getDetail(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      }
       else res.status(200).send(data);
    });
  },
  
  getListProducts: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Product.getListProducts((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getProductList: (req, res) => {
    if (req.query.number) {
      Product.getAddProductList(req.query, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    } else {
      Product.getProductList((err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    }
  },
  getProductListSale: (req, res) => {
    if (req.query.number) {
      Product.getAddProductListSale(req.query, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    } else {
      Product.getDiscountProductList((err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    }
  },

  getProductListMana: (req, res) => {
    Product.getProductListManage((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  updateProduct: (req, res) => {
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Product.updateProduct(req.params.id, new Product(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.id,
          });
        }
      } else res.status(200).send(data);
    });
  },

  deleteProduct: (req, res) => {
    Product.deleteProduct(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getNewProduct: (req, res) => {
    Product.getNewProduct((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getDiscountProduct: (req, res) => {
    Product.getDiscountProduct((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  getDiscountProductList: (req, res) => {
    Product.getDiscountProductList((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
