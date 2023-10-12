const db = require("../firebaseAdmin");

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    await db.collection('CategoryDb').add({ category });
    res.status(200).send('Category added');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Fetch all categories
exports.getAllCategories = async (req, res) => {
  try {
    const snapshot = await db.collection('CategoryDb').get();
    const categories = [];
    snapshot.forEach((doc) => {
      let id = doc.id;
      let data = doc.data();
      categories.push({ id, ...data });
    });
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { category } = req.body;
    await db.collection('CategoryDb').doc(id).update({ category });
    res.status(200).send('Category updated');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('CategoryDb').doc(id).delete();
    res.status(200).send('Category deleted');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
