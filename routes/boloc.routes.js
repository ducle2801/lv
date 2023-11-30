module.exports = (app) => {
  const filter = require('../controllers/boloc.controller');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/manage/filter/sortby/:key', filter.sortBy);
  app.get('/api/manage/filter/sorttype/:key', filter.sortType);

  app.get('/api/manage/filter/sortbrand/:key', filter.sortBrand);

  app.get('/api/manage/filter/sortSize', filter.sortSize);
  app.get('/api/manage/filter/sortSizeBrand', filter.sortSizeBrand);
  app.get('/api/manage/filter/sortSizeBrandSale', filter.sortSizeBrandSale);

  app.get('/api/manage/filter/search/:key', filter.search);

  app.get('/api/manage/filter/range_price', filter.rangePrice);

  app.get('/api/manage/filter/sortbySale/:key', filter.sortBySale);

  app.get('/api/manage/filter/sortbrandSale/:key', filter.sortBrandSale);

  app.get('/api/manage/filter/sortSizeSale', filter.sortSizeSale);

  app.get('/api/manage/filter/range_priceSale', filter.rangePriceSale);
  app.get('/api/manage/filter/sortTypeSale/:key', filter.sortTypeSale);
};
