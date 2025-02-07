import { Router } from "express";
import pvcController from "../controllers/pvcControllers.js";

const { getShortestPath } = pvcController;

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: PVC
 *     description: API endpoints for managing pvc (travel salesman problem) requests
 *
 * /api/v1/pvc:
 *   post:
 *     summary: Create a new pvc (travel salesman problem) request
 *     tags: [PVC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PVC'
 *     responses:
 *       200:
 *         description: The travel salesman problem path and its cost
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
