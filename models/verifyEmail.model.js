const nodemailer = require("nodemailer");

const VerifyEmail = function (verify) {
  this.email = verify.email;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dck28012001@gmail.com",
    pass: "ygwtlcutaifrmfpf",
  },
});
VerifyEmail.sendCode = (newverify, result) => {
  const code = Math.floor(100000 + Math.random() * 900000);
  const mailOptions = {
    from: '"Trạm Xanh" <foo@example.com>' ,
    to: newverify.email,
    subject: "Chào mừng bạn đến với Trạm Xanh",
    text: `Mã xác thực tài khoản: ${code}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  result(null, { code: code.toString() });
};

// VerifyEmail.senDonHang = ({template: templateName,templateVars,...restOfOptions}) => {
//   const templatePath = `templates/${templateName}.html`; // đường dẫn tới template
//   const options = {
//     from: ,
//     ...restOfOptions,
//   };

//   if (templateName && fs.existsSync(templatePath)) {
//     const template = fs.readFileSync(templatePath, "utf-8");
//     const html = ejs.render(template, templateVars);
//     // templateVars là các biến được truyền vào template thông qua hàm render
//     // const text = convert(html);
//     const htmlWithStylesInlined = juice(html);

//     options.html = htmlWithStylesInlined;
//     //options.text = text;
//   }

//   // hàm smtp.sendMail() này sẽ trả về cho chúng ta một Promise
//   return transporter.sendMail(options);
// };



module.exports = VerifyEmail;
