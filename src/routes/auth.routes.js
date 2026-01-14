const express = require("express");
const { testAuth } = require("../controllers/auth.controller");

const router = express.Router();
router.get("/test", testAuth);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middlewares/auth.middleware");

// router.get("/test", authMiddleware, (req, res) => {
//   res.json({
//     message: "Protected route working",
//     user: req.user,
//   });
// });

// module.exports = router;
