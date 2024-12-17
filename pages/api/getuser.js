import User from "../../modal/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ success: false, error: "Token is missing." });
      }

      const user = jsonwebtoken.verify(token, process.env.JWD_SECRET);

      if (!user || !user.email) {
        return res.status(400).json({ success: false, error: "Invalid token." });
      }

      const dbuser = await User.findOne({ email: user.email });

      if (!dbuser) {
        // Handle case when user is not found in the database
        return res.status(404).json({ success: false, error: "User not found in the database." });
      }

      // Destructure properties from the user document
      const { name, email, wallet, accountHN, phone, ifsc, accno, bankName, UPINo, branch, updated } = dbuser;

      // Respond with the user details
      return res.status(200).json({ 
        success: true,
        name, 
        email, 
        wallet, 
        accountHN, 
        phone, 
        ifsc, 
        accno, 
        bankName, 
        UPINo, 
        branch, 
        updated 
      });
    } catch (error) {
      console.error(error);

      // Handle errors such as invalid tokens
      return res.status(500).json({ success: false, error: "Internal server error or invalid token." });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }
};

export default connectDb(handler);
