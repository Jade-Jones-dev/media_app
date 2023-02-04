module.exports = (app) => {
	const messages = require("../controllers/message.controller.js");

	var router = require("express").Router();

	// Create a new Messages
	router.post("/", messages.create);

	// Retrieve all messages
	router.get("/", messages.findAll);

	// Retrieve a single Messages with id
	router.get("/:id", messages.findOne);

	// Update a Messages with id
	router.put("/:id", messages.update);

	// Delete a Messages with id
	router.delete("/:id", messages.delete);

	// Delete all messages
	router.delete("/", messages.deleteAll);

	app.use("/api/messages", router);
};
