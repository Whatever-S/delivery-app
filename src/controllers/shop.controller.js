import Shop from "../models/shop.model.js";

export const getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find();
    res.json(shops); 
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving shops' }); 
  }
}


