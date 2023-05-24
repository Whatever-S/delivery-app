import Order from "../models/order.model.js";

// Controller function to create an order
export const createOrder = async (req, res, next) => {
  const { email, phoneNumber, address, products } = req.body;

  try {
    // Create a new order document
    const order = await Order.create({ email, phoneNumber, address, products });
    res.json(order); // Send the created order as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Error creating order' }); // Handle any errors that occur during order creation
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders); 
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving shops' }); 
  }
}