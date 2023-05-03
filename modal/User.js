const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    wallet: {type: Number, default: 0},
    ifsc: {type: String, default: ''},
    branch: {type: String, default: ''},
    bankName: {type: String, default: ''},
    accountHN: {type: String, default: ''},
    accno: {type: String, default: ''},
    UPINo: {type: String, default: ''},
    updated: {type: Boolean, default: false},
}, {timestamps: true});

// mongoose.models = {}
export default mongoose.models.User || mongoose.model("User", UserSchema);

