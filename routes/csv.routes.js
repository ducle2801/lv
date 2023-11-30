const multer = require("multer");
const upfile = multer();
module.exports = (app) => {
  const CSV = require("../controllers/csv.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/csv/add", upfile.single("file"), CSV.createCsv);
  app.post("/api/csv/adddetail", upfile.single("file"), CSV.createdetailCsv);
  app.post("/api/csv/image", upfile.single("file"), CSV.createImageCsv);

  // app.get("/api/color/id=:id", color.getColor);

  // app.get("/api/color/idms=:idms", color.getOneColor);

  // app.get("/api/color/list", color.getListColor);

  // app.delete("/api/color/delete_color/:idms", color.deColor);
};
