const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    randomNum: { type: String, required: true },
    cardno: { type: String, required: true },
    cardDetails: { type: Object, required: true },
    amount: { type: Number, required: true },
    winning: { type: String, default: 'Pending', required: true },
}, { timestamps: true });

// mongoose.models = {}
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);