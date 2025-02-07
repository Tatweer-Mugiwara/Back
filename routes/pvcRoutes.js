import { Router } from "express";
import pvcController from "../controllers/pvcControllers.js";

const { getShortestPath } = pvcController;

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: PVC
 *     description: API endpoints for managing pvc (tsp) requests
 *
 * /api/v1/pvc:
 *   post:
 *     summary: Create a new pvc (tsp) request
 *     tags: [PVC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PVC'
 *     responses:
 *       200:
 *         description: The tsp path and its cost
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PathCost'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

router.post("/", getShortestPath);

export default router;
