const jwt = require("jsonwebtoken");
module.exports = {
  CheckValidate: (req, res, next) => {
    try {
      const authen = req.headers["authorization"];
      const token = authen && authen.split(" ")[1];
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (decode) {
        next();
      }
    } catch (error) {}
  },
};
