import connectDb from "../../middleware/mongoose";
import WinnerNotification from "../../modal/WinnerNotification";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email, orderData } = req.body;
        
        console.log('\n=== CREATE WINNER NOTIFICATION ===');
        console.log('Email:', email);
        console.log('OrderData:', JSON.stringify(orderData));
        
        if (!email || !orderData) {
            return res.status(400).json({ error: "Email and orderData are required" });
        }

        // Validate orderData structure
        if (!orderData.orderId || !orderData.randomNum || !orderData.cardno || !orderData.amount) {
            return res.status(400).json({ error: "Invalid orderData structure" });
        }

        const gameDate = new Date();
        
        // Fix the orderData to ensure orderId is stored as a number, not string
        console.log('Original orderId:', orderData.orderId, 'Type:', typeof orderData.orderId);
        const fixedOrderData = {
            ...orderData,
            orderId: parseInt(orderData.orderId) || orderData.orderId
        };
        console.log('Fixed orderId:', fixedOrderData.orderId, 'Type:', typeof fixedOrderData.orderId);
        
        // Create or update notification
        const notification = await WinnerNotification.createOrUpdateNotification(
            email, 
            gameDate, 
            fixedOrderData
        );
        console.log('Notification created/updated:', notification._id);

        res.status(200).json({
            success: true,
            message: "Winner notification created/updated successfully",
            notificationId: notification._id
        });

    } catch (error) {
        console.error('Error creating winner notification:', error);
        res.status(500).json({ 
            error: "Failed to create winner notification",
            details: error.message 
        });
    }
};

export default connectDb(handler);
