const express = require('express');
const router = express.Router();

const {create, categoryById,read,update,remove,list} = require('../controllers/category');
const { requireSignin } = require('../controllers/auth');

router.post('/category/create', create);
router.get('/category/:categoryId', read);
router.get('/categories', list);


router.param("categoryId",categoryById); 

module.exports=router;