import { modelNames } from "mongoose"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWD_SECRET)
        let dbuser = await User.findOneAndUpdate({ email: user.email },
            {
                email: req.body.email,
                pan_no: req.body.pan_no,
                phone: req.body.phone,
                name: req.body.name,
                ifsc: req.body.ifsc,
                accno: req.body.accno,
                wallet: req.body.walletUp,
            }
        )
        res.status(200).json({ success: true })
    }
    else {
        res.status(500).json({ error: "error" })
    }
}
export default connectDb(handler);