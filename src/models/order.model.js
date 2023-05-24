import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 1,
    },
  }],
});

const Order = mongoose.model('Order', orderSchema);
export default Order;