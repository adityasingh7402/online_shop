import connectDb from "../../middleware/mongoose";
import WinnerNotification from "../../modal/WinnerNotification";
import Order from "../../modal/Order";
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

        // Get today's date range
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Find broken notifications (those with isResultAvailable but incorrect winning status)
        const brokenNotifications = await WinnerNotification.find({
            email: email,
            isResultAvailable: true,
            gameDate: { $gte: startOfDay, $lte: endOfDay }
        });

        let repairedCount = 0;

        for (const notification of brokenNotifications) {
            let needsUpdate = false;
            let totalWinnings = 0;
            let winningBets = 0;

            // Get actual order results from the Order collection
            for (const orderInNotification of notification.orders) {
                const actualOrder = await Order.findOne({
                    orderId: String(orderInNotification.orderId),
                    email: email
                });

                if (actualOrder) {
                    // Update the order in notification if status is different
                    if (orderInNotification.winning !== actualOrder.winning) {
                        orderInNotification.winning = actualOrder.winning;
                        needsUpdate = true;
                    }

                    // Recalculate winnings
                    if (actualOrder.winning === 'Win') {
                        winningBets++;
                        totalWinnings += (orderInNotification.amount * 2 - orderInNotification.amount * 0.2);
                    }
                }
            }

            // Update totals if they're wrong
            if (notification.totalWinnings !== Math.floor(totalWinnings) || 
                notification.winningBets !== winningBets) {
                notification.totalWinnings = Math.floor(totalWinnings);
                notification.winningBets = winningBets;
                needsUpdate = true;
            }

            if (needsUpdate) {
                notification.updatedAt = new Date();
                await notification.save();
                repairedCount++;
            }
        }

        res.status(200).json({
            success: true,
            message: `Repaired ${repairedCount} winner notifications`,
            repairedCount,
            totalChecked: brokenNotifications.length
        });

    } catch (error) {
        console.error('Error repairing winner notifications:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        }
        
        res.status(500).json({ 
            error: "Failed to repair winner notifications",
            details: error.message 
        });
    }
};

export default connectDb(handler);
