const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.post('/add', categoryController.addCategory);
router.get('/all', categoryController.getAllCategories);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;
