import connectDb from "../../middleware/mongoose";
import Order from "../../modal/Order";
import GameResult from "../../modal/GameResult";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.JWD_SECRET);
  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    let OrdersInfo = await Order.find({
      email: data.email,
      updatedAt: { $gte: startOfDay, $lte: endOfDay },
    });
    
    // Fetch game result for today
    let GameResultInfo = await GameResult.findOne({
      gameDate: startOfDay
    });
    
    res.status(200).json({ OrdersInfo, GameResultInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb(handler);