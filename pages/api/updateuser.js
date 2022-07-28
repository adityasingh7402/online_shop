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
                address: req.body.address,
                pincode: req.body.pincode,
                phone: req.body.phone,
                name: req.body.name,
                landmark: req.body.landmark,
            }
        )
        res.status(200).json({ success: true })
    }
    else {
        res.status(500).json({ error: "error" })
    }
}
export default connectDb(handler);