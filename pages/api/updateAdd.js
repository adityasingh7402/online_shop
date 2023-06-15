import { modelNames } from "mongoose"
import AddCoin from "../../modal/Addcoin"
import connectDb from "../../middleware/mongoose"
import User from "../../modal/User"
import { useRouter } from "next/router";

const handler = async (req, res) => {

    if (req.method == "POST") {
        const email = req.body.Orderemail;
        
        const matchedOrders = await User.find({email: req.body.Orderemail});
        const addamount = req.body.Orderamount;
        await User.updateOne({ email }, { $inc: { wallet: addamount } });

        let dbuser = await AddCoin.updateOne({orderId: req.body.Orderid},
            {
                status: "Paid",
            }
        )
        res.status(200).json({ success: "Paid Successfully" })
    } else {
        res.status(500).json({ error: "Invalid request method." });
    }
};
export default connectDb(handler);