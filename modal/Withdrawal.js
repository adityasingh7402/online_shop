const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    orderId: { type: Number, required: true },
    amount: {type: Number, default: 0},
    ifsc: {type: String, default: ''},
    pan_no: {type: String, default: ''},
    accno: {type: Number, default: ''},
    status: {type: String, default: 'Pending'},
}, { timestamps: true });

export default mongoose.models.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);