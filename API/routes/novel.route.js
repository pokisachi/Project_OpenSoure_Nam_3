module.exports = app => {
    const novel = require("../controllers/novel.controller.js");
    var router = require("express").Router();
  
    // Tạo mới một đối tượng cảm biến
    router.post("/", novel.create);
  
    // Retrieve all novel
    router.get("/", novel.findAll);
  
    // Retrieve a single novel with id
    router.get("/:id", novel.findOne);
  
    // Update a novel with id
    router.put("/:id", novel.update);
  
    // Delete a novel with id
    router.delete("/:id", novel.delete);
  
    // Delete all Cảm biến
    router.delete("/", novel.deleteAll);
  
    app.use('/api/novel', router);
  };
