const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

router.post('/add', menuController.addMenuItem);
router.get('/all', menuController.getAllMenuItems);
router.put('/update/:id', menuController.updateMenuItem);
router.delete('/delete/:id', menuController.deleteMenuItem);

module.exports = router;
