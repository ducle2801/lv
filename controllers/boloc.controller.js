const Filter = require('../models/boloc.model');

module.exports = {
  sortBy: (req, res) => {
    Filter.sortBy(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  sortType: (req, res) => {
    Filter.sortType(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sortBrand: (req, res) => {
    Filter.sortBrand(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sortSize: (req, res) => {
    const { check } = req.query;
    const size = check.join("','");
    Filter.sortSize(size, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  sortSizeBrand: (req, res) => {
    const { check, brand } = req.query;
    const size = check.join("','");
    Filter.sortSizeBrand(size, brand, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  sortSizeBrandSale: (req, res) => {
    const { check, brand } = req.query;
    const size = check.join("','");
    Filter.sortSizeBrandSale(size, brand, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  search: (req, res) => {
    Filter.search(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  rangePrice: (req, res) => {
    Filter.rangePrice(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sortBySale: (req, res) => {
    Filter.sortBySale(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sortBrandSale: (req, res) => {
    Filter.sortBrandSale(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  sortTypeSale: (req, res) => {
    Filter.sortTypeSale(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  sortSizeSale: (req, res) => {
    const { check } = req.query;
    const size = check.join("','");
    Filter.sortSizeSale(size, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  rangePriceSale: (req, res) => {
    Filter.rangePriceSale(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
