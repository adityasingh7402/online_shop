import connectDb from "../../middleware/mongoose"
import Addcoin from "../../modal/Addcoin"
import jsonwebtoken from "jsonwebtoken";


const handler = async (req, res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.JWD_SECRET);
    let addcoins = await Addcoin.find({ email: data.email});

    res.status(200).json({ addcoins })
}

export default connectDb(handler);