const multer = require("multer");
const fileStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./views/public/asset/banner/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
});

const upload = multer({storage: fileStore});
// console.log(upload.array());
module.exports = (app) => {
  const anhbia = require("../controllers/anhbia.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/manage/banner/upload", upload.array("photos"), anhbia.createImage);
  app.get("/api/manage/banner", anhbia.getBanner);
  app.delete("/api/manage/banner/delete=:id", anhbia.deleteBanner);
};
