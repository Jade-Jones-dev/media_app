const db = require("../models");
const Message = db.messages;
const Op = db.Sequelize.Op;

// Create and Save a new Message
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    if (!req.body.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Message
    const message = {
      title: req.body.title,
      body: req.body.body,
      
    };
  
    // Save message in the database
    Message.create(message)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Message."
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Message.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving messages."
        });
      });
  };

// Find a single message with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Message.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

// Update a message by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Message.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Message was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Message with id=" + id
        });
      });
  };

// Delete a Mesage  with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Message.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "TMessage was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Message with id=" + id
        });
      });
  };

// Delete all Message from the database.
exports.deleteAll = (req, res) => {
    Message.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all messages."
        });
      });
  };

