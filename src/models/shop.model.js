import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  goods: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;