import { modelNames } from "mongoose"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method === "POST") {
        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWD_SECRET);
        let dbuser = await User.findOne({ email: user.email });
        
        if (dbuser) {
            if (!dbuser.updated) {
                dbuser.email = req.body.email;
                dbuser.branch = req.body.branch;
                dbuser.phone = req.body.phone;
                dbuser.walletUp = req.body.walletUp;
                dbuser.name = req.body.name;
                dbuser.ifsc = req.body.ifsc;
                dbuser.accno = req.body.accno;
                dbuser.accountHN = req.body.accountHN;
                dbuser.bankName = req.body.bankName;
                dbuser.UPINo = req.body.upiId;
                dbuser.updated = true;
                await dbuser.save();
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ error: "User email cannot be updated again." });
            }
        } else {
            res.status(400).json({ error: "User not found." });
        }
    } else {
        res.status(500).json({ error: "error" });
    }
};
export default connectDb(handler);