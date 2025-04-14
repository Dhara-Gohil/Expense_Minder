import Shopkeeper from '../../models/Shopkeeper/shopkeeperModel.js';


export const getShopkeepers = async (req, res) => {
    try {
        // Assuming ShopkeeperModel is your model for shopkeepers
        const shopkeepers = await Shopkeeper.find(); // Fetching shopkeepers from database
    
        // Map the data to include both 'username' and 'name'
        const response = shopkeepers.map(shopkeeper => ({
          username: shopkeeper.username,  // Include 'username'
          name: shopkeeper.name  // Include 'name'
        }));
    
        res.json(response); // Send the mapped response
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
};
