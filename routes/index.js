import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import ordersRouters from "./ordersRoutes.js";
import optimizationRouters from "./optimizationRoutes.js"

const router = Router();

router.use('/users', usersRouters);
router.use('/orders',ordersRouters); 
router.use('/optimization',optimizationRouters); 


export default router;