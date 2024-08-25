const express = require("express");
const cors = require("cors");
const router = express.Router();
const controller = require("../controller/controller");
const { checkAuth } = require("../auth");

const corsOptions = {
  origin: `http://localhost:3000`, // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

router.use(cors(corsOptions)); // Apply CORS middleware
router.use(express.json()); // Middleware to parse JSON request bodies

// Authentication middleware
router.use(checkAuth);

// Routes
router.get("/jobs", controller.display_all_jobs);
router.post("/createJob", controller.create_job);
router.put("/editJob", controller.edit_job);
router.delete("/deleteJob/:jobId", controller.delete_job);

// Error handling middleware
router.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

module.exports = router;
