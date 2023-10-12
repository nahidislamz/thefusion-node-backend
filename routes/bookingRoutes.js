const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.post('/create', bookingController.createBooking);
router.get('/all', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/update/:id', bookingController.updateBooking);
router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;
