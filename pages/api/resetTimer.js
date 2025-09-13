import TimerSettings from "../../modal/TimerSettings"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            // Get the current timer settings
            let timerSettings = await TimerSettings.findOne().sort({ createdAt: -1 });
            
            if (!timerSettings) {
                return res.status(404).json({ 
                    error: "No timer settings found. Please configure timer settings first." 
                });
            }

            // Calculate new next announcement time based on current duration
            const now = new Date();
            const nextAnnouncementTime = new Date(now.getTime() + (timerSettings.durationInMinutes * 60 * 1000));

            // Update the timer settings with new next announcement time
            timerSettings.nextAnnouncementTime = nextAnnouncementTime;
            timerSettings.lastUpdated = now;
            await timerSettings.save();

            res.status(200).json({ 
                success: "Timer reset successfully",
                timerSettings: timerSettings,
                message: `Timer reset to ${timerSettings.durationInMinutes} minute${timerSettings.durationInMinutes !== 1 ? 's' : ''}`
            });
        } catch (error) {
            console.error('Error resetting timer:', error);
            res.status(500).json({ 
                error: "Failed to reset timer",
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
