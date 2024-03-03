const User =  require("../models/user");
const Role = require("../models/Role");

const createUser = async (req, res) => {
  try {
    const { username, gmail, password, rol } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      gmail,
      password,
      rol: rolesFound.map((rol) => rol._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      gmail: savedUser.gmail,
      rol: savedUser.rol,
    });
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUser
};