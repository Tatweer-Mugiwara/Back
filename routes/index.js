import { Router } from "express";
import usersRouters from "./usersRoutes.js";

import ordersRouters from "./ordersRoutes.js";
import optimizationRouters from "./optimizationRoutes.js";
import reportsRouters from "./reportsRoutes.js";
import historiesRoutes from "./historiesRoutes.js";
import capteursRoutes from "./capteursRoutes.js";
import trucksRoutes from "./trucksRoutes.js";
import alertRulesRoutes from "./alertRulesRoutes.js";
import alertsRoutes from "./alertsRoutes.js";
import captionsRoutes from "./captionsRoutes.js";
import pvcRoutes from "./pvcRoutes.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = Router();

router.use('/users', usersRouters);

router.use(verifyAuth);

router.use('/orders',ordersRouters); 
router.use('/optimization',optimizationRouters); 
router.use('/reports', reportsRouters);
router.use('/histories', historiesRoutes);
router.use('/capteurs', capteursRoutes);
router.use('/trucks', trucksRoutes);
router.use('/alert-rules', alertRulesRoutes);
router.use('/alerts', alertsRoutes);
router.use('/captions', captionsRoutes);
router.use("/pvc", pvcRoutes);

export default router;
