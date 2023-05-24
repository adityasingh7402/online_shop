const mongoose = require('mongoose');

const AddcoinSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    transId: { type: Number, required: true },
    paymentInfo: { type: String, default: '' },
    transactionId: { type: String, default: "" },
    status: { type: String, default: 'Initiated', required: true },
}, { timestamps: true });

// mongoose.models = {}
export default mongoose.models.Addcoin || mongoose.model("Addcoin", AddcoinSchema);