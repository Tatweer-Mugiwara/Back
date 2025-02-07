import { Router } from "express";
import usersRouters from "./usersRoutes.js";

import ordersRouters from "./ordersRoutes.js";
import optimizationRouters from "./optimizationRoutes.js"
import reportsRouters from "./reportsRoutes.js";
import historiesRoutes from "./historiesRoutes.js";

const router = Router();

router.use('/users', usersRouters);

router.use('/orders',ordersRouters); 
router.use('/optimization',optimizationRouters); 
router.use('/reports', reportsRouters);
router.use('/histories', historiesRoutes);


export default router;