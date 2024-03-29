import connectDb from "../../middleware/mongoose"
import Order from "../../modal/Order"
import jsonwebtoken from "jsonwebtoken";


const handler = async (req, res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(token, process.env.JWD_SECRET);
    let orders = await Order.find({ email: data.email});

    res.status(200).json({ orders })
}

export default connectDb(handler);