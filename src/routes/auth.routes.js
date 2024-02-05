const { Router } = require("express");
const {
  signinHandler,
  signupHandler,
} = require("../controllers/auth.controller");
const {
  checkExistingRole,
  checkExistingUser,
} = require("../middlewares/verifySignup");

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", [checkExistingUser, checkExistingRole], signupHandler);

router.post("/signin", signinHandler);

module.exports = router;