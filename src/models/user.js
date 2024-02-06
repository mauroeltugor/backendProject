const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../services/generateTokens");
const getUserInfo = require("../models/getUserInfo");
const Token = require("../models/token");

const UserSchema = new mongoose.Schema({
  gmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  rol: { type: [String], default: ["user"] }
});

const productSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    gmail: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.path("gmail").validate({
  validator: async function (value) {
    const count = await this.model("User").countDocuments({ gmail: value });
    return count === 0;
  },
  message: "El nombre de usuario ya está en uso",
});

// Hash the password before saving or updating
UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      document.password = hash;
      next();
    });
  } else {
    next();
  }
});

// Compare a password with the hashed password stored in the database
UserSchema.methods.comparePassword = async function (password, hash) {
  try {
    const same = await bcrypt.compare(password, hash);
    return same;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

// Create a refresh token for the user and store it in the database
UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this));
  try {
    await new Token({ token: refreshToken }).save();
    return refreshToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcryptjs.compare(password, receivedPassword)
}

productSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcryptjs.hash(user.password, 10);
  user.password = hash;
  next();
})

// Export the User model
module.exports = mongoose.model("User", UserSchema);
