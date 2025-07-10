import verifyUser from '../middlewares/verifyuser';
import { registerUser } from '../controllers/auth.controller';
import { Router } from 'express';

const router: Router = Router()

router.post("/register", verifyUser, registerUser);
router.post("/login",)


export default router;
