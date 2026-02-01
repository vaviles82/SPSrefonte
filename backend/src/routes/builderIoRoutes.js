const express = require('express');
const router = express.Router();
const { getBuilderIoPages } = require('../controllers/builderIoController');

router.post('/:path', getBuilderIoPages);
 

module.exports = router;    
