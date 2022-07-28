import { modelNames } from "mongoose"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWD_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        const { name, email, address, pincode, phone, landmark } = dbuser
        res.status(200).json({ name, email, address, pincode, phone, landmark })
    }
    else {
        res.status(500).json({ error: "error" })
    }
}
export default connectDb(handler);