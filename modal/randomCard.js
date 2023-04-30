const mongoose = require('mongoose');

const RandomNSchema = new mongoose.Schema({
    card1: { type: Number, required: true },
    card2: { type: Number, required: true },
    card3: { type: Number, required: true },
}, { timestamps: true });

// mongoose.models = {}
export default mongoose.models.randomCard || mongoose.model("randomCard", RandomNSchema);