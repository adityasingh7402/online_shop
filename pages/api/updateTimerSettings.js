import TimerSettings from "../../modal/TimerSettings"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const { durationInMinutes, updatedBy } = req.body;

            // Validate input
            if (!durationInMinutes || durationInMinutes < 1) {
                return res.status(400).json({ 
                    error: "Duration must be at least 1 minute" 
                });
            }

            // Calculate next announcement time
            const now = new Date();
            const nextAnnouncementTime = new Date(now.getTime() + (durationInMinutes * 60 * 1000));

            // Find existing settings or create new one
            let timerSettings = await TimerSettings.findOne().sort({ createdAt: -1 });
            
            if (timerSettings) {
                // Update existing settings
                timerSettings.durationInMinutes = durationInMinutes;
                timerSettings.nextAnnouncementTime = nextAnnouncementTime;
                timerSettings.lastUpdated = now;
                if (updatedBy) timerSettings.updatedBy = updatedBy;
                await timerSettings.save();
            } else {
                // Create new settings
                timerSettings = new TimerSettings({
                    durationInMinutes,
                    nextAnnouncementTime,
                    updatedBy: updatedBy || 'Admin'
                });
                await timerSettings.save();
            }

            res.status(200).json({ 
                success: "Timer settings updated successfully",
                timerSettings: timerSettings
            });
        } catch (error) {
            res.status(500).json({ 
                error: "Failed to update timer settings",
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
