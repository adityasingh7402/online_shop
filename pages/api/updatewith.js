import Withdrawal from "../../modal/Withdrawal";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const updatedOrder = await Withdrawal.findOneAndUpdate(
                { orderId: req.body.Orderid },
                { status: "Transferred" },
                { new: true } // This option returns the updated document
            );
            if (updatedOrder) {
                res.status(200).json({ success: "Status updated to Transferred successfully" });
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(400).json({ error: "Invalid request method." });
    }
};

export default connectDb(handler);
