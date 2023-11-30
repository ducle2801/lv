module.exports = (app) => {
  
  const customer = require("../controllers/khachhang.controller");

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/auth/signup", customer.createUser);

  app.post("/api/auth/signin", customer.getUser);

  app.get("/api/checkuser/email=:email", customer.checkUser);

  app.get("/api/get_user/id_kh=:id_kh", customer.getOneUser);

  app.get("/api/get_user/list", customer.getListClient);

  app.put("/api/change_password/email=:email", customer.changePassword);

  app.put("/api/update_user/status=:status/idkh=:idkh", customer.updateStatusUser);
  app.get("/api/get_user/detail/id_kh=:id_kh", customer.getDetailUser);
  app.get("/api/get_user/money/id_kh=:id_kh", customer.getMoneyUser);
  app.put("/api/update_user/money/type=:type/idkh=:idkh", customer.updateMemberUser);
 


};
