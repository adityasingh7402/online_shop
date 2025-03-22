import Query from "../../modal/Query";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  // Only allow DELETE method
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract query ID from request body
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Query ID is required" });
    }

    // Find and delete the query
    const deletedQuery = await Query.findByIdAndDelete(id);

    if (!deletedQuery) {
      return res.status(404).json({ error: "Query not found" });
    }

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: "Query deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting query:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

export default connectDb(handler);