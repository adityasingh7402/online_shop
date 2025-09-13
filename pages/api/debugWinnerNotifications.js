import connectDb from "../../middleware/mongoose";
import WinnerNotification from "../../modal/WinnerNotification";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { token } = req.body;
        
        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }

        // Verify token and get user email
        const data = jsonwebtoken.verify(token, process.env.JWD_SECRET);
        const email = data.email;

        // Get all notifications for user (for debugging)
        const allNotifications = await WinnerNotification.find({ email }).sort({ createdAt: -1 });

        // Get today's notifications
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const todayNotifications = await WinnerNotification.find({
            email,
            gameDate: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ createdAt: -1 });

        // Get pending notifications
        const pendingNotifications = await WinnerNotification.find({
            email,
            isResultAvailable: true,
            hasShownAnimation: false,
            gameDate: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            email,
            debug: {
                totalNotifications: allNotifications.length,
                todayNotifications: todayNotifications.length,
                pendingNotifications: pendingNotifications.length,
                allNotifications: allNotifications.map(n => ({
                    _id: n._id,
                    gameDate: n.gameDate,
                    isResultAvailable: n.isResultAvailable,
                    hasShownAnimation: n.hasShownAnimation,
                    ordersCount: n.orders.length,
                    totalWinnings: n.totalWinnings,
                    winningBets: n.winningBets
                })),
                todayNotifications: todayNotifications.map(n => ({
                    _id: n._id,
                    gameDate: n.gameDate,
                    isResultAvailable: n.isResultAvailable,
                    hasShownAnimation: n.hasShownAnimation,
                    ordersCount: n.orders.length
                })),
                pendingNotifications: pendingNotifications.map(n => ({
                    _id: n._id,
                    gameDate: n.gameDate,
                    isResultAvailable: n.isResultAvailable,
                    hasShownAnimation: n.hasShownAnimation
                }))
            }
        });

    } catch (error) {
        console.error('Error debugging winner notifications:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        
        res.status(500).json({ 
            error: "Failed to debug winner notifications",
            details: error.message 
        });
    }
};

export default connectDb(handler);
