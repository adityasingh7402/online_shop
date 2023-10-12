import { modelNames } from "mongoose"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const deletedUser = await User.findOneAndDelete({ email: req.body.email });
            if (deletedUser) {
                res.status(200).json({ success: "Remove Successfully" });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(500).json({ error: "Invalid request method." });
    }
};
export default connectDb(handler);