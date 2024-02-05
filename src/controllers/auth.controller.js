const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/Role");
const { TOKEN_EXPIRATION, JWT_SECRET } = require("../../src/controllers/config");

const signupHandler = async (req, res, next) => {
  try {
    const { username, gmail, password, rol } = req.body;

    const newUser = new User({
      username,
      gmail,
      password,
    });

    // Verify roles
    if (rol) {
      const foundRoles = await Role.find({ name: { $in: rol } });
      newUser.rol = foundRoles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      newUser.rol = [defaultRole._id];
    }

    // Save the User object in MongoDB
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    return res.status(200).json({ token });
  } catch (error) {
    // Handle specific error cases
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    } else if (error.code === 11000) { 
      return res.status(400).json({ message: 'Email or username already exists' });
    } else {
      next(error);
    }
  }
};

const signinHandler = async (req, res, next) => {
  try {
    const userFound = await User.findOne({ gmail: req.body.gmail }).populate("rol");

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: userFound._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupHandler,
  signinHandler,
};
