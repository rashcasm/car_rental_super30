// test controller
async function testAuth(req, res) {
  res.send("Auth testauth controller is working");
}
// baki stuff

const bcrypt = require("bcrypt");
const {prisma} = require("../config/prisma");
const { generateToken } = require("../utils/jwt");

/**
 * POST /auth/signup
 */
async function signup(req, res) {
  try {
    const { username, password } = req.body;

    // 1. invalid inputs
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "invalid inputs",
      });
    }

    // 2. check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "username already exists",
      });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // 5. success response
    return res.status(201).json({
      success: true,
      data: {
        message: "User created successfully",
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

/**
 * POST /auth/login
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // 1. invalid inputs
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "invalid inputs",
      });
    }

    // 2. find user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "user does not exist",
      });
    }

    // 3. compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: "incorrect password",
      });
    }

    // 4. generate JWT (ONLY HERE)
    const token = generateToken(user.id, user.username);

    // 5. success response
    return res.status(200).json({
      success: true,
      data: {
        message: "Login successful",
        token: token,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

module.exports = {
  testAuth,
  signup,
  login,
};
