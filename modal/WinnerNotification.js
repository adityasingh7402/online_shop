const mongoose = require('mongoose');

const WinnerNotificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    gameDate: {
        type: Date,
        required: true,
        index: true
    },
    orders: [{
        orderId: {
            type: Number,
            required: true
        },
        randomNum: {
            type: Number,
            required: true
        },
        cardno: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        winning: {
            type: String,
            enum: ['Pending', 'Win', 'Loss'],
            default: 'Pending'
        }
    }],
    hasShownAnimation: {
        type: Boolean,
        default: false
    },
    gameResult: {
        winningCard: Number,
        winningPosition: Number,
        card1: Number,
        card2: Number,
        card3: Number
    },
    totalWinnings: {
        type: Number,
        default: 0
    },
    winningBets: {
        type: Number,
        default: 0
    },
    isResultAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { 
    timestamps: true,
    // Create compound index for efficient queries
    indexes: [
        { email: 1, gameDate: 1 },
        { email: 1, hasShownAnimation: 1 }
    ]
});

// Static method to create or update notification
WinnerNotificationSchema.statics.createOrUpdateNotification = async function(email, gameDate, orderData) {
    const startOfDay = new Date(gameDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(gameDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    try {
        // Ensure orderId is a number
        const fixedOrderData = {
            ...orderData,
            orderId: typeof orderData.orderId === 'string' ? parseInt(orderData.orderId) : orderData.orderId
        };
        console.log('WinnerNotification: Storing orderId as', fixedOrderData.orderId, 'type:', typeof fixedOrderData.orderId);
        
        let notification = await this.findOne({
            email: email,
            gameDate: { $gte: startOfDay, $lte: endOfDay }
        });
        
        if (notification) {
            // Add new order to existing notification
            notification.orders.push(fixedOrderData);
            notification.updatedAt = new Date();
            await notification.save();
            return notification;
        } else {
            // Create new notification
            notification = new this({
                email: email,
                gameDate: startOfDay,
                orders: [fixedOrderData],
                hasShownAnimation: false,
                isResultAvailable: false
            });
            await notification.save();
            return notification;
        }
    } catch (error) {
        console.error('Error creating/updating winner notification:', error);
        throw error;
    }
};

// Static method to update with game results
WinnerNotificationSchema.statics.updateWithGameResult = async function(gameDate, gameResult, orderResults) {
    const startOfDay = new Date(gameDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(gameDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    try {
        // Get all notifications for this game date
        const notifications = await this.find({
            gameDate: { $gte: startOfDay, $lte: endOfDay }
        });
        
        // Update each notification with results
        for (let notification of notifications) {
            let totalWinnings = 0;
            let winningBets = 0;
            
            // Update order results
            notification.orders.forEach(order => {
                // Find the order result from the orderResults array
                // Convert orderId to string for comparison since database might store as different types
                const result = orderResults.find(r => 
                    r.email === notification.email && 
                    String(r.orderId) === String(order.orderId)
                );
                
                if (result) {
                    order.winning = result.winning;
                    if (result.winning === 'Win') {
                        winningBets++;
                        totalWinnings += (order.amount * 2 - order.amount * 0.2);
                    }
                }
            });
            
            // Update notification with game result and calculations
            notification.gameResult = gameResult;
            notification.totalWinnings = Math.floor(totalWinnings);
            notification.winningBets = winningBets;
            notification.isResultAvailable = true;
            notification.updatedAt = new Date();
            
            await notification.save();
        }
        
        return notifications.length;
    } catch (error) {
        console.error('Error updating notifications with game results:', error);
        throw error;
    }
};

// Static method to get pending notification for user
WinnerNotificationSchema.statics.getPendingNotification = async function(email) {
    try {
        // Get today's date range
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);
        
        const notification = await this.findOne({
            email: email,
            isResultAvailable: true,
            hasShownAnimation: false,
            gameDate: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ createdAt: -1 });
        
        return notification;
    } catch (error) {
        console.error('Error getting pending notification:', error);
        throw error;
    }
};

// Static method to mark animation as shown
WinnerNotificationSchema.statics.markAnimationShown = async function(notificationId) {
    try {
        await this.findByIdAndUpdate(notificationId, {
            hasShownAnimation: true,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error('Error marking animation as shown:', error);
        throw error;
    }
};

// mongoose.models = {}
export default mongoose.models.WinnerNotification || mongoose.model("WinnerNotification", WinnerNotificationSchema);
