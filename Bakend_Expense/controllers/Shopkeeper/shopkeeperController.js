import Shopkeeper from '../../models/Shopkeeper/shopkeeperModel.js';

export const getShopkeepers = async (req, res) => {
  try {
    const shopkeepers = await Shopkeeper.find({}, 'name username email'); // Fetch only needed fields

    const response = shopkeepers.map(shopkeeper => ({
      id: shopkeeper._id,         // Send id for selection
      name: shopkeeper.name,      // Name for dropdown label
      email: shopkeeper.email     // Email for backend use
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
