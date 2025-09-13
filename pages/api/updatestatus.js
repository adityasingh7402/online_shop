import { modelNames } from "mongoose"
import Order from "../../modal/Order"
import User from "../../modal/User"
import GameResult from "../../modal/GameResult"
import randomCard from "../../modal/randomCard"
import WinnerNotification from "../../modal/WinnerNotification"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    // const startOfYesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // startOfYesterday.setHours(0, 0, 0, 0);
    // const endOfYesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // endOfYesterday.setHours(23, 59, 59, 999);

    if (req.method == "POST") {
        try {
            // Find all orders with the given randomNum and cardno
            // Convert to strings since that's how they're stored in Order collection
            const matchedOrders = await Order.find({
                randomNum: String(req.body.randomNum),
                cardno: String(req.body.cardno),
                winning: "Pending",
                // createdAt: {
                //     $gte: startOfYesterday,
                //     $lte: endOfYesterday
                // }
            });

            // Group the orders by email
            const ordersByUser = {};
            matchedOrders.forEach((order) => {
                if (!ordersByUser[order.email]) {
                    ordersByUser[order.email] = [];
                }
                ordersByUser[order.email].push(order);
            });

            // Loop through each user's orders, add up the amounts, and update their wallet
            for (const [email, orders] of Object.entries(ordersByUser)) {
                const totalAmount = orders.reduce(
                    (acc, order) => acc + (2 * order.amount - 0.2 * order.amount),
                    0
                );
                // const roundedAmount = Math.floor(totalAmount);
                const roundedAmount = Math.floor(totalAmount);
                await User.updateOne({ email }, { $inc: { wallet: roundedAmount } });
            }

            // Save game result after processing all winners
            const currentDate = new Date();
            const startOfDay = new Date(currentDate);
            startOfDay.setHours(0, 0, 0, 0);
            
            // Get current day's cards from randomCard collection
            const todaysCards = await randomCard.findOne().sort({ createdAt: -1 });
            
            // ========================================
            // STEP 1: UPDATE ORDER STATUSES FIRST
            // ========================================
            
            // Update losing orders
            let dbusers = await Order.updateMany({
                winning: "Pending",
                $or: [
                    { randomNum: { $ne: String(req.body.randomNum) } },
                    { cardno: { $ne: String(req.body.cardno) } }
                ]
            }, {
                winning: "Loss"
            });

            // Update winning orders
            let dbuser = await Order.updateMany({
                winning: "Pending",
                randomNum: String(req.body.randomNum), 
                cardno: String(req.body.cardno)
            }, {
                winning: "Win",
            });
            
            if (todaysCards) {
                // Determine winning position based on winning card
                let winningPosition = 1;
                if (req.body.randomNum == todaysCards.card2) winningPosition = 2;
                else if (req.body.randomNum == todaysCards.card3) winningPosition = 3;
                
                // Save the game result
                try {
                    await GameResult.findOneAndUpdate(
                        { gameDate: startOfDay },
                        {
                            gameDate: startOfDay,
                            card1: todaysCards.card1,
                            card2: todaysCards.card2,
                            card3: todaysCards.card3,
                            winningCard: parseInt(req.body.randomNum),
                            winningPosition: winningPosition
                        },
                        { upsert: true, new: true }
                    );
                } catch (gameResultError) {
                    // Error saving game result
                }
                
                // ========================================
                // STEP 3: UPDATE WINNER NOTIFICATIONS
                // ========================================
                try {
                    const gameResultData = {
                        winningCard: parseInt(req.body.randomNum),
                        winningPosition: winningPosition,
                        card1: todaysCards.card1,
                        card2: todaysCards.card2,
                        card3: todaysCards.card3
                    };
                    
                    // Find all winner notifications for today
                    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
                    
                    const notifications = await WinnerNotification.find({
                        gameDate: { $gte: startOfDay, $lte: endOfDay }
                    });
                    
                    // Update each notification directly
                    for (const notification of notifications) {
                        let totalWinnings = 0;
                        let winningBets = 0;
                        let updated = false;
                        
                        // Update each order in the notification
                        for (let i = 0; i < notification.orders.length; i++) {
                            const notifOrder = notification.orders[i];
                            
                            // FORCE convert orderId to number if it's a string
                            if (typeof notifOrder.orderId === 'string') {
                                notification.orders[i].orderId = parseInt(notifOrder.orderId);
                            }
                            
                            // Find the actual order from Orders collection
                            // Match orderId as number since that's how it's stored in Orders
                            const searchOrderId = typeof notifOrder.orderId === 'string' ? parseInt(notifOrder.orderId) : notifOrder.orderId;
                            
                            const actualOrder = await Order.findOne({
                                orderId: searchOrderId,
                                email: notification.email
                            });
                            
                            if (actualOrder) {
                                // Update the winning status
                                notification.orders[i].winning = actualOrder.winning;
                                updated = true;
                                
                                // Calculate winnings if it's a win
                                if (actualOrder.winning === 'Win') {
                                    winningBets++;
                                    const winAmount = (notifOrder.amount * 2) - (notifOrder.amount * 0.2);
                                    totalWinnings += winAmount;
                                }
                            }
                        }
                        
                        // Update the notification with results
                        notification.gameResult = gameResultData;
                        notification.totalWinnings = Math.floor(totalWinnings);
                        notification.winningBets = winningBets;
                        notification.isResultAvailable = true;
                        
                        // Save the updated notification
                        await notification.save();
                    }
                } catch (notificationError) {
                    // Error updating winner notifications
                }
            }
            
        } catch (error) {
            res.status(500).json({ error: "An error occurred." });
        }
        
        res.status(200).json({ success: true });
    } else {
        res.status(500).json({ error: "Invalid request method." });
    }
};
export default connectDb(handler);