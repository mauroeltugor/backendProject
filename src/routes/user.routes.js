const { Router } = require("express");
const { createUser } = require("../controllers/user.controller");
const { isAdmin, verifyToken } = require("../middlewares/authJwt");
const { checkExistingUser } = require("../middlewares/verifySignup");

const router = Router();

router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);

export default router;