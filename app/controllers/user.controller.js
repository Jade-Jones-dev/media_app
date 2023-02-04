const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const passwordValidator = require('password-validator');
let schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123', 'password' , 'Password']); // Blacklist these values


exports.signup = (req, res, next) => {
  if(!schema.validate(req.body.password)){
    return res.status(401).json({
      error: new Error("Your password must be a minimum of 8 characters and include both upper and lowercase letters, no spaces and 2 digits"),
    });
  } else{
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
          const user = new User({email: req.body.email,
          password: hash,
        });
      user.save().then(
          () => {
              res.status(201).json({
                  message: 'User added successfully'
              })
          })
      .catch((error) => res.status(400).json({ error }))
      .catch((error) =>res.status(500).json({ error }))
      })
    }
  };

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
    (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
          }
          bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Incorrect password!')
                  });
                }
              const token = jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' });
              res.status(200).json({
                userId: user._id,
                token: token
                });
              }
            ).catch(
              (error) => {
                res.status(500).json({
                  error: error
                });
              }
            );
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }

// // Create and Save a new Message
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.title) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a Message
//     const message = {
//       title: req.body.title,
//       description: req.body.description,
//       published: req.body.published ? req.body.published : false
//     };
  
//     // Save message in the database
//     Message.create(message)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Message."
//         });
//       });
//   };

//   exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
//     Message.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving messages."
//         });
//       });
//   };

// // Find a single message with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Message.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Tutorial with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
//   };

// // Update a message by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
  
//     Message.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Message was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Message with id=${id}. Maybe Message was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Message with id=" + id
//         });
//       });
//   };

// // Delete a Mesage  with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     Message.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "TMessage was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Message with id=${id}. Maybe Message was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Message with id=" + id
//         });
//       });
//   };

// // Delete all Message from the database.
// exports.deleteAll = (req, res) => {
//     Message.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Tutorials were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all messages."
//         });
//       });
//   };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Message.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving messages."
//         });
//       });
//   };