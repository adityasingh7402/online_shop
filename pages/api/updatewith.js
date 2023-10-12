import { modelNames } from "mongoose"
import Withdrawal from "../../modal/Withdrawal"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const deletedOrder = await Withdrawal.findOneAndDelete({ Orderid: req.body.Orderid });
            if (deletedOrder) {
                res.status(200).json({ success: "Paid Successfully" });
            } else {
                res.status(404).json({ error: "Order not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(500).json({ error: "Invalid request method." });
    }
};
export default connectDb(handler);