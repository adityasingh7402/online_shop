const mongoose = require('mongoose');

const TimerSettingsSchema = new mongoose.Schema({
    durationInMinutes: { 
        type: Number, 
        required: true,
        default: 1440 // Default 24 hours = 1440 minutes
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    },
    updatedBy: { 
        type: String, 
        required: false 
    },
    nextAnnouncementTime: {
        type: Date,
        required: true,
        default: () => {
            const now = new Date();
            now.setHours(24, 0, 0, 0); // Default to next midnight
            return now;
        }
    }
}, { timestamps: true });

// mongoose.models = {}
export default mongoose.models.TimerSettings || mongoose.model("TimerSettings", TimerSettingsSchema);
