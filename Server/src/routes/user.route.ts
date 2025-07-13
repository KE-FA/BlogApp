import { Router } from "express";
import {
  updateUserInfo,
  changeUserPassword,
} from "../controllers/user.controller";
import verifyUser from "../middlewares/verifyuser";

const router: Router = Router();

router.patch("/", verifyUser, updateUserInfo);
router.put("/password", verifyUser, changeUserPassword);

export default router;
