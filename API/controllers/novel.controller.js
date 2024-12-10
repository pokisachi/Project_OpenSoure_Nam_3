const db = require("../models");
const Novel = db.novel;

const moment = require("moment");



exports.create = (req, res) => {
  // Validate request
  if (!req.body.tentruyen) {
    res.status(400).send({ message: "tên truyện không thể rỗng!" });
    return;
  }
  if (!req.body.theloai) {
    res.status(400).send({ message: "thể loại không thể rỗng!" });
    return;
  }
  if (!req.body.tacgia) {
    res.status(400).send({ message: "tác giả không thể rỗng!" });
    return;
  }
  if (!req.body.noidung) {
    res.status(400).send({ message: "nội dung không thể rỗng!" });
    return;
  }
  // Tạo 1 đối tượng cảm biến
  const novel = new Novel({
    ngaynhan: moment().format("L"), //11/04/2023
    gionhan: moment().format("LT"), //21:07
    tentruyen: req.body.tentruyen, 
    theloai: req.body.theloai,
    tacgia: req.body.tacgia,
    noidung: req.body.noidung,
  });

  // Save đối tượng  vào trong db
  novel
    .save(novel)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Đã có lỗi xảy ra khi lưu dữ liệu vào bảng",
      });
    });
};


exports.findAll = (req, res) => {
  const ngaynhan = req.query.ngaynhan;
  var condition = ngaynhan ? { ngaynhan: { $regex: new RegExp(ngaynhan), $options: "i" } } : {};
  //{
  //  ngaynhan: '12/05/2023'  
  //  }
  Novel.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Có lỗi trong khi tìm ngày nhận",
      });
    });
};
//Retrieve a single object
//Find a single  with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Novel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Novel with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Novel with id=" + id });
    });
};

//Update an object
//Update a  identified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Novel.findByIdAndUpdate( id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Novel with id=${id}. Maybe Novel was not found!`,
        });
      } else res.send({ message: "Nove" + id + " was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Novel with id=" + id,
      });
    });
};


//Delete an object
//Delete a  with the specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Novel.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Novel with id=${id}. Maybe Novel was not found!`,
        });
      } else {
        res.send({
          message: `Novel ${id} was deleted successfully!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Novel with id=" + id,
      });
    });
};


//Delete all objects
//Delete all  from the database
exports.deleteAll = (req, res) => {
  Novel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Novel were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all novel.",
      });
    });
};
