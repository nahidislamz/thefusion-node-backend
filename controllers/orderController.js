const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_m5CoYUu63mOtAiuFCWO4JAEH006sw6ZimR');
const db = require("../firebaseAdmin");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, token, customer, orderType, customerNotes } = req.body;
    // Perform payment processing via Stripe
    const charge = await stripe.charges.create({
      amount: totalAmount,
      currency: 'gbp',
      source: token,
      description: `Order payment from ${userId}`,
      receipt_email: customer.email,
      metadata: {
        orderUserId: userId,
        customerName: customer.name,
        customerPhone: customer.phone,
        orderType: orderType,
        customerNotes: customerNotes // Added customer notes to metadata
      },
    });

    // Validate orderType
    if (!['takeaway', 'collection'].includes(orderType)) {
      res.status(400).send('Invalid order type');
      return;
    }

    // Add order to the database if payment was successful
    if (charge.status === 'succeeded') {
      await db.collection('OrdersDb').add({
        userId,
        items,
        totalAmount,
        customer,
        orderType, // Added orderType to be stored in the database
        customerNotes, // Added customer notes to be stored in the database
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(200).send('Order placed and payment successful');
    } else {
      res.status(500).send('Payment failed');
    }
  } catch (error) {
    console.log("Error details:", error); 
    res.status(500).send(error.toString());
  }
};

// Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const snapshot = await db.collection('OrdersDb').get();
    const orders = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      orders.push({ id, ...data });
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error.toString());
    console.log(error)
  }
};

// Retrieve a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await db.collection('OrdersDb').doc(id).get();
    if (!order.exists) {
      res.status(404).send('Order not found');
    } else {
      res.status(200).send({ id: order.id, ...order.data() });
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('OrdersDb').doc(id).delete();
    res.status(200).send('Order deleted');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
