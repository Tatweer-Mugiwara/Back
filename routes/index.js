import { Router } from "express";
import usersRouters from "./usersRoutes.js";

import ordersRouters from "./ordersRoutes.js";
import optimizationRouters from "./optimizationRoutes.js"
import reportsRouters from "./reportsRoutes.js";
import historiesRoutes from "./historiesRoutes.js";
import capteursRoutes from "./capteursRoutes.js";
import trucksRoutes from "./trucksRoutes.js";
import alertRulesRoutes from "./alertRulesRoutes.js";

const router = Router();

router.use('/users', usersRouters);
router.use('/orders',ordersRouters); 
router.use('/optimization',optimizationRouters); 
router.use('/reports', reportsRouters);
router.use('/histories', historiesRoutes);
router.use('/capteurs', capteursRoutes);
router.use('/trucks', trucksRoutes);
router.use('/alert-rules', trucksRoutes);

export default router;
