import { Router } from "express";
import usersRouters from "./usersRoutes.js";
import ordersRouters from "./ordersRoutes.js";

const router = Router();

router.use('/users', usersRouters);
router.use('/orders',ordersRouters); 
router.use('/optimization',ordersRouters); 


export default router;