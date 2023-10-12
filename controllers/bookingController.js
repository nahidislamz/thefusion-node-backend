const db = require("../firebaseAdmin");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { fullname, email, phone, date, time, noOfGuests, note } = req.body;
    //const timestamp = admin.firestore.FieldValue.serverTimestamp();
    await db.collection('BookingsDb').add({ 
      fullname, email, phone, date, time, noOfGuests, note 
    });
    res.status(200).send('Booking created');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Retrieve all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const snapshot = await db.collection('BookingsDb').get();
    const bookings = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      bookings.push({ id, ...data });
    });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Retrieve a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await db.collection('BookingsDb').doc(id).get();
    if (!booking.exists) {
      res.status(404).send('Booking not found');
    } else {
      res.status(200).send({ id: booking.id, ...booking.data() });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    await db.collection('BookingsDb').doc(id).update(updateData);
    res.status(200).send('Booking updated');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('BookingsDb').doc(id).delete();
    res.status(200).send('Booking deleted');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
