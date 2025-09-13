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

        // Get pending notification for user
        const notification = await WinnerNotification.getPendingNotification(email);

        if (!notification) {
            return res.status(200).json({ 
                success: true,
                hasPendingNotification: false,
                notification: null 
            });
        }

        res.status(200).json({
            success: true,
            hasPendingNotification: true,
            notification: {
                _id: notification._id,
                orders: notification.orders,
                gameResult: notification.gameResult,
                totalWinnings: notification.totalWinnings,
                winningBets: notification.winningBets,
                gameDate: notification.gameDate
            }
        });

    } catch (error) {
        console.error('Error getting pending winner notification:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        
        res.status(500).json({ 
            error: "Failed to get pending winner notification",
            details: error.message 
        });
    }
};

export default connectDb(handler);
