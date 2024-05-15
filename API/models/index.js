const dbConfig = require("../config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.novel = require("./novel.model.js")(mongoose);
//db.nhanvien = require("./nhanvien.model.js")(mongoose);
module.exports = db;
