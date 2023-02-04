const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message.controller.js");

// Create a new message
router.post("/", messageCtrl.create);

// Retrieve all message
router.get("/", messageCtrl.findAll);

// Retrieve a single message with id
router.get("/:id", messageCtrl.findOne);

// Update a message with id
router.put("/:id", messageCtrl.update);

// Delete a message with id
router.delete("/:id", messageCtrl.delete);

// Delete all messages
router.delete("/", messageCtrl.deleteAll);

module.exports= router;
