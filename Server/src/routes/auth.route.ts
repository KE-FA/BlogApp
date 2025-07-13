// import verifyUser from '../middlewares/verifyuser';
import { registerUser, loginUser } from "../controllers/auth.controller";
import verifyUserInformation from "../middlewares/verifyUserInfo";
import checkUserNameAndEmailReuse from "../middlewares/checkEmailAndUserNameReuse";
import verifyPasswordStrength from "../middlewares/verifyPasswordStrength";
import { Router } from "express";

const router: Router = Router();

router.post(
  "/register",
  verifyUserInformation,
  checkUserNameAndEmailReuse,
  verifyPasswordStrength,
  registerUser
);
router.post("/login", loginUser);

export default router;
