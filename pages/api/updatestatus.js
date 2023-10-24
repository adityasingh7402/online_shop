import { modelNames } from "mongoose"
import Order from "../../modal/Order"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    // const startOfYesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // startOfYesterday.setHours(0, 0, 0, 0);
    // const endOfYesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    // endOfYesterday.setHours(23, 59, 59, 999);

    if (req.method == "POST") {
        try {
            // Find all orders with the given randomNum and cardno
            const matchedOrders = await Order.find({
                randomNum: req.body.randomNum,
                cardno: req.body.cardno,
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
                console.log(totalAmount)
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred." });
        }
        let dbusers = await Order.updateMany({
            winning: "Pending",
            // createdAt: {
            //     $gte: startOfYesterday,
            //     $lte: endOfYesterday
            // },
            $or: [
                { randomNum: { $ne: req.body.randomNum } },
                { cardno: { $ne: req.body.cardno } }
            ]
        }, {
            winning: "Loss"
        });

        let dbuser = await Order.updateMany({
            winning: "Pending",
            // createdAt: {
            //     $gte: startOfYesterday,
            //     $lte: endOfYesterday
            // },
             randomNum: req.body.randomNum, cardno: req.body.cardno
        },
            {
                winning: "Win",
            }
        )
        console.log(dbuser)
    } else {
        res.status(500).json({ error: "Invalid request method." });
    }
};
export default connectDb(handler);