import BettingRestriction from "../../modal/BettingRestriction"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            const { 
                customMessage, 
                startTime, 
                endTime, 
                availableAfterMessage,
                restrictionType,
                isActive,
                updatedBy 
            } = req.body;

            // Validate required fields
            if (!startTime || !endTime) {
                return res.status(400).json({ 
                    error: "Start time and end time are required" 
                });
            }

            // Validate time range
            const start = new Date(startTime);
            const end = new Date(endTime);
            
            if (start >= end) {
                return res.status(400).json({ 
                    error: "End time must be after start time" 
                });
            }

            // Validate message
            if (!customMessage || customMessage.trim().length === 0) {
                return res.status(400).json({ 
                    error: "Custom message is required" 
                });
            }

            // Deactivate all existing restrictions first
            await BettingRestriction.updateMany({}, { isActive: false });

            // Create new restriction
            const newRestriction = new BettingRestriction({
                customMessage: customMessage.trim(),
                startTime: start,
                endTime: end,
                availableAfterMessage: availableAfterMessage || "Betting will be available after",
                restrictionType: restrictionType || 'betting_only',
                isActive: isActive !== false, // Default to true unless explicitly false
                createdBy: updatedBy || 'Admin',
                updatedBy: updatedBy || 'Admin'
            });

            await newRestriction.save();

            res.status(200).json({ 
                success: "Betting restriction updated successfully",
                restriction: newRestriction
            });
        } catch (error) {
            res.status(500).json({ 
                error: "Failed to update betting restriction",
                details: error.message 
            });
        }
    } else if (req.method == "DELETE") {
        try {
            const { restrictionId } = req.body;

            if (restrictionId) {
                // Deactivate specific restriction
                await BettingRestriction.findByIdAndUpdate(restrictionId, { isActive: false });
            } else {
                // Deactivate all restrictions
                await BettingRestriction.updateMany({}, { isActive: false });
            }

            res.status(200).json({ 
                success: "Betting restrictions deactivated successfully"
            });
        } catch (error) {
            res.status(500).json({ 
                error: "Failed to deactivate betting restrictions",
                details: error.message 
            });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDb(handler);
