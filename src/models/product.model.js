const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  // Los tests envían string
  category: { type: String, required: true },
  stock: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);


