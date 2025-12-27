import mongoose from 'mongoose';
const salesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cust_name: {
    type: String,
    required: true,
  },
  cust_email: {
    type: String,
    required: true,
  },
  
  cust_contact: {
    type: String,
  },
  cartItems: {
    type: Array,
    default: [],
  }
}, { timestamps: true }); // adds createdAt and updatedAt fields automatically

const Sale = mongoose.model('Sale', salesSchema);

export default Sale;
