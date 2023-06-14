import connectDb from "../../middleware/mongoose"
import User from "../../modal/User"

var CryptoJS = require("crypto-js");

const handler = async (req, res)=>{
    if(req.method == 'POST'){
        const {name, email, phone, ageVerified, state} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            res.status(400).json({ error: "This email is already registered" });
        }
        else{
        let u = new User({name, email,phone, ageVerified, state, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
        await u.save()
        res.status(200).json({ success: "success" })
        }
    }
    else{
        res.status(400).json({ error: "This method is not allowed" })
    }
}
export default connectDb(handler);