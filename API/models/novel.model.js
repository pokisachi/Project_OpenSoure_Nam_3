module.exports = (mongoose) => {
    const schema = mongoose.Schema(
      {
        ngaynhan: String,
        gionhan: String,
        tentruyen: String,
        theloai: String,
        tacgia: String,
        noidung: String,
      },
      { timestamps: true }
    );

    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Novel = mongoose.model("novel", schema);

    return Novel;
  };
