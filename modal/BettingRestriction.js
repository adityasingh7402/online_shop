const mongoose = require('mongoose');

const BettingRestrictionSchema = new mongoose.Schema({
    isActive: { 
        type: Boolean, 
        required: true,
        default: false 
    },
    restrictionType: {
        type: String,
        enum: ['betting_only', 'site_wide'],
        default: 'betting_only'
    },
    customMessage: { 
        type: String, 
        required: true,
        default: "Betting is not available right now. Please come back later." 
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    availableAfterMessage: {
        type: String,
        required: false,
        default: "Betting will be available after"
    },
    createdBy: { 
        type: String, 
        required: false 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    },
    updatedBy: { 
        type: String, 
        required: false 
    }
}, { timestamps: true });

// Method to check if restriction is currently active
BettingRestrictionSchema.methods.isCurrentlyActive = function() {
    if (!this.isActive) return false;
    
    const now = new Date();
    return now >= this.startTime && now <= this.endTime;
};

// Static method to get current active restriction
BettingRestrictionSchema.statics.getCurrentRestriction = async function() {
    const now = new Date();
    return await this.findOne({
        isActive: true,
        startTime: { $lte: now },
        endTime: { $gte: now }
    }).sort({ createdAt: -1 });
};

// mongoose.models = {}
export default mongoose.models.BettingRestriction || mongoose.model("BettingRestriction", BettingRestrictionSchema);
