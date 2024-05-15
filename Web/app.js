const express = require("express");
const app = express();

app.locals.baseURL = "http://localhost:4000"
//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  //res.send("Chào mừng trang chủ");
  res.render('index',  {title:'Trang quản trị'})
});

app.get("/novel", (req, res) => {
  res.render('novel/index',  {title:'Trang truyện'})
});

app.listen(4000, () => {
  console.log("Server web đang chạy ở port 4000");
});
