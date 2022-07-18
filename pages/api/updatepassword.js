import { modelNames } from "mongoose"
import User from "../../modal/User"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
import CryptoJS from "crypto-js"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let token = req.body.token
        let user = jsonwebtoken.verify(token, process.env.JWD_SECRET)
        let dbuser = await User.findOne({ email: user.email })
        const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptedPass == req.body.currentPass && req.body.newPass == req.body.ReEnter) {

            let dbuser = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.ReEnter, process.env.AES_SECRET).toString() })
            res.status(200).json({ success: true })
            return
        }
        res.status(200).json({ success: false })
    }
    else {
        res.status(500).json({ error: "error" })
    }
}
export default connectDb(handler);