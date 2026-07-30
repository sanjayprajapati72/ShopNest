const healthController = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Server is running successfully",
            status: "OK",
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Health check failed",
            error: error.message
        });
    }
};

module.exports = {
    healthController
};