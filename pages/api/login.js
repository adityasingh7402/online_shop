import connectDb from "../../middleware/mongoose";
import User from "../../modal/User";

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email });
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                var token = jwt.sign({ email: user.email, name: user.name, phone: user.phone }, process.env.JWD_SECRET, {
                    // expiresIn: "1d"
                });
                res.status(200).json({ success: true, token, email: user.email });

            }
            else {
                res.status(200).json({ success: false, error: "Invalid Credetials" });
            }
        }
        else {
            res.status(200).json({ success: false, error: "No user found" });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};
export default connectDb(handler);
