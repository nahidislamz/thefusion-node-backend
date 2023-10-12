const db = require("../firebaseAdmin");

exports.addMenuItem = async (req, res) => {
  try {
    const { name, desc, category, price } = req.body;
    await db.collection('MenuDb').add({ name, desc, category, price });
    res.status(200).send('Item added');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const snapshot = await db.collection('MenuDb').get();
    const menuItems = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      menuItems.push({ id, ...data });
    });
    res.status(200).send(menuItems);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, desc, category, price } = req.body;
    await db.collection('MenuDb').doc(id).update({ name, desc, category, price });
    res.status(200).send('Item updated');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('MenuDb').doc(id).delete();
    res.status(200).send('Item deleted');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
