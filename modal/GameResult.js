const mongoose = require('mongoose');

const GameResultSchema = new mongoose.Schema({
    gameDate: { type: Date, required: true },
    card1: { type: Number, required: true },
    card2: { type: Number, required: true },
    card3: { type: Number, required: true },
    winningCard: { type: Number, required: true },
    winningPosition: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.GameResult || mongoose.model('GameResult', GameResultSchema);
