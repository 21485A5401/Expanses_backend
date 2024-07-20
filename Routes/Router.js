const express = require('express');
const router = express.Router();
const User = require('../controllers/Users.js');
const Expense = require('../controllers/Expense.js');
const isLogin = require('../middleware/isLogin.js');
const Summary = require('../controllers/Summary.js');
const category = require('../controllers/Category.js');



//User Register
router.post('/Register',User.userRegister);
router.post('/Login',User.userLogin);

//Expanse Routes
router.post('/createExponse',isLogin,Expense.createExponse);
router.get('/getExpense',isLogin,Expense.getExpense);
router.post('/updateExpanse/:id',isLogin,Expense.updateExpanse);
router.post('/deleteExpanse/:id',isLogin,Expense.deleteExpanse);
router.post('/totalPeriod/:period',isLogin,Summary.totalPeriod);
router.get('/spending_by_categoury',isLogin,Summary.spending_by_categoury);

//create Category
router.post('/createCategory',isLogin,category.createCategory);
router.get('/getCategory',isLogin,category.getCategory);


module.exports = router;

