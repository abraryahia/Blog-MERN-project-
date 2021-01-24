const express = require('express');
const blogs = require('./bolg');
const users = require('./user');
//const authMW = require('../middleware/auth');

const router = express.Router();


router.use('/user', users);
router.use('/blog' , blogs);

module.exports={
    router,
}