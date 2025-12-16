const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true, index: true },
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['purchased', 'out_of_stock'], required: true },
  }],
  amount: { type: Number, required: true },
  status: { type: String, enum: ['complete', 'partial'], required: true },
}, { timestamps: true });

ticketSchema.pre('save', function () {
  if (!this.code) {
    this.code = `TCK-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);