const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get("/", auth, messageCtrl.getAllMessages);
router.get('/:id', auth, messageCtrl.getOneMessage);
router.post('/', auth, multer, messageCtrl.createMessage);
router.post('/:id/like', auth, messageCtrl.likeMessage);
router.put('/:id', auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

module.exports = router;