const express = require("express");
const { testAuth, signup, login } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/test", testAuth);
router.post("/signup", signup);
router.post("/login", login);

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
