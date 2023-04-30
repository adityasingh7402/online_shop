import connectDb from "../../middleware/mongoose"
import Withdrawal from "../../modal/Withdrawal"
import jsonwebtoken from "jsonwebtoken";


const handler = async (req, res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.JWD_SECRET);
    let withdrawals = await Withdrawal.find({ email: data.email});

    res.status(200).json({ withdrawals })
}

export default connectDb(handler);