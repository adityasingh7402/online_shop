import TimerSettings from "../../modal/TimerSettings"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "GET") {
        try {
            let timerSettings = await TimerSettings.findOne().sort({ createdAt: -1 });
            
            // If no settings exist, create default settings
            if (!timerSettings) {
                const now = new Date();
                const nextMidnight = new Date(now);
                nextMidnight.setHours(24, 0, 0, 0);
                
                timerSettings = new TimerSettings({
                    durationInMinutes: 1440, // 24 hours
                    nextAnnouncementTime: nextMidnight
                });
                await timerSettings.save();
            }
            
            res.status(200).json({ 
                success: true, 
                timerSettings: timerSettings 
            });
        } catch (error) {
            res.status(500).json({ 
                error: "Failed to fetch timer settings",
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
