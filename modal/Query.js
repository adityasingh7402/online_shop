const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true},
}, { timestamps: true });

// mongoose.models = {}
export default mongoose.models.Query || mongoose.model("Query", QuerySchema);
