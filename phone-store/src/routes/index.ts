import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import phonesRouter from "./phones";

const router: IRouter = Router();

router.use(healthRouter);
router.use(usersRouter);
router.use(phonesRouter);

export default router;