const express = require('express');
const router = express.Router();
const { sendToMakeCom } = require('../controllers/makeComController');

router.post('/send', sendToMakeCom);


module.exports = router;    