import BettingRestriction from "../../modal/BettingRestriction"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "GET") {
        try {
            // Get all restrictions sorted by creation date
            const allRestrictions = await BettingRestriction.find().sort({ createdAt: -1 });
            
            // Get current active restriction
            const currentRestriction = await BettingRestriction.getCurrentRestriction();
            
            // Check if betting is currently restricted
            const isBettingRestricted = currentRestriction ? currentRestriction.isCurrentlyActive() : false;
            
            res.status(200).json({ 
                success: true,
                restrictions: allRestrictions,
                currentRestriction: currentRestriction,
                isBettingRestricted: isBettingRestricted
            });
        } catch (error) {
            res.status(500).json({ 
                error: "Failed to fetch betting restrictions",
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
