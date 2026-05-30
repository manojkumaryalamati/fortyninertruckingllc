import { Router, type IRouter } from "express";
import healthRouter from "./health";
import appRouter from "./routes";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(appRouter);

export default router;
