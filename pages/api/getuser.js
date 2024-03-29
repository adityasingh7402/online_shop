import { modelNames } from "mongoose"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWD_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        const { name, email, wallet, accountHN, phone, ifsc, accno, bankName, UPINo, branch, updated } = dbuser
        res.status(200).json({ name, email, wallet, accountHN, phone, ifsc, accno, bankName, UPINo, branch, updated })
    }
    else {
        res.status(500).json({ error: "error" })
    }
}
export default connectDb(handler);