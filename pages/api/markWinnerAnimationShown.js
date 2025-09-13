import connectDb from "../../middleware/mongoose";
import WinnerNotification from "../../modal/WinnerNotification";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { token, notificationId } = req.body;
        
        if (!token || !notificationId) {
            return res.status(400).json({ error: "Token and notificationId are required" });
        }

        // Verify token
        const data = jsonwebtoken.verify(token, process.env.JWD_SECRET);
        
        // Mark animation as shown
        await WinnerNotification.markAnimationShown(notificationId);

        res.status(200).json({
            success: true,
            message: "Winner animation marked as shown"
        });

    } catch (error) {
        console.error('Error marking winner animation as shown:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        
        res.status(500).json({ 
            error: "Failed to mark winner animation as shown",
            details: error.message 
        });
    }
};

export default connectDb(handler);
