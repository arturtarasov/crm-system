const express = require('express');
const contrller = require('../controllers/auth');
const router = express.Router();


//localhost:5000/api/auth/login
router.get('/login', contrller.login);

//localhost:5000/api/auth/registr
router.get('/registr', contrller.registr);


module.exports = router;