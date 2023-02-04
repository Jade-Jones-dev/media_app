// const Message = require('../models/message.model');
// const fs = require('fs');

// // getAllmessages

// exports.getAllMessages = (req, res, next) => {
//     Message.find()
// 	.then((messages) => {res.status(200).json(messages);
// 	})
//     .catch((error) => {res.status(400).json({error: error,});
//     });
// }

// // getOnemessage

// exports.getOneMessage = (req, res, next) => {
// 	Message.findOne({_id: req.params.id})
// 	.then((message) => {res.status(200).json(message);
// 	})
// 	.catch((error) => {res.status(404).json({ error: error });
// 	});
// };

// // createmessage
// exports.createMessage = (req, res, next) => {
// 	req.body.message = JSON.parse(req.body.message);
// 	const url = req.protocol + "://" + req.get("host");
// 	const message = new Message({
// 		userId: req.body.message.userId,
// 		title: req.body.message.title,
// 		description: req.body.message.description,
// 		imageUrl: url + "/images/" + req.file.filename,	
// 	})
// 	message.save()
// 	.then(() =>{
// 		res.status(201).json({
// 			message: "message saved successfully",
// 		});
// 	})
// 	.catch((error) =>{
// 		res.status(400).json({
// 			error: error,
// 		})
// 	})
// }

// // delete a message

// exports.deleteMessage = (req, res, next) => {
// 	Message.findOne({ _id: req.params.id })
// 	.then((message) => {
// 		const filename = message.imageUrl.split("/images/")[1];
// 		fs.unlink("images/" + filename, () => {
// 			Message.deleteOne({ _id: req.params.id })
// 			.then(() => {
// 				res.status(200).json({ message: "Deleted!"});
// 				})
// 				.catch((error) => {
// 					res.status(400).json({ error: error,});
// 				});
// 		});
// 	});
// };

// // like a message

// exports.likeMessage = (req, res, next) => {
// 	let user = req.body.userId

// 	Message.findOne({ _id: req.params.id })
// 	  .then((smessage) => {
// 		//If user has not yet liked 
// 		if (!message.usersLiked.includes(user)) {
// 			message.usersLiked.push(user);
// 			message.likes+1;
// 		}
// 		//If user has liked message
// 		if (message.usersLiked.includes(user)) {
// 			message.usersLiked.splice(message.usersLiked.indexOf(user), 1);
// 		  	message.likes-1;
// 		}
// 		message.save()
// 		.then((message) => res.status(200).json({message}))
// 		.catch((error) => res.status(400).json({ error: error }));
// 	  })
//   };

// // modify message
// exports.modifyMessage = (req, res, next) => {
// 	const messageObject = req.file ? {
// 		...JSON.parse(req.body.message),
// 		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
// 	} : {...req.body};

// 	delete messageObject._userId;


// 	Message.findOne({_id: req.params.id})
// 		.then((message) => {
// 			if(message.userId !== req.auth.userId){
// 				res.status(403).json({message: "Unauthorised"})
// 				return;
// 			}
// 			const filename = message.imageUrl.split("/images/")[1];
// 			if(req.file){
//                 fs.unlink(`images/${filename}`, (error) => {
//                     if(error){
//                         throw error
//                     }
//                 })
//             }

// 			Message.updateOne({_id: req.params.id},{...messageObject,_id: req.params.id})
// 			.then(() => res.status(200).json({message: 'message has been updated'}))
// 			.catch((error) => res.status(400).json({error}))
// 		})
// 		.catch((error) => res.status(400).json({error}))
//   }





