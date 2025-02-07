import { Router } from "express";
import optimizationControllers from "../controllers/optimizationControllers.js";

const { suggestOptimization, confirmOptimization } = optimizationControllers;
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Optimization
 *     description: API endpoints for order optimization
 *
 * /api/v1/optimization/suggest:
 *   post:
 *     summary: Suggest optimized order combinations
 *     tags: [Optimization]
 *     responses:
 *       200:
 *         description: A list of optimized order combinations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 optimizedOrders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 estimatedCost:
 *                   type: number
 *                   description: The estimated cost of the optimized combination
 *       400:
 *         description: No pending orders available for optimization
 *
 * /api/v1/optimization/confirm:
 *   post:
 *     summary: Confirm the optimized order combination
 *     tags: [Optimization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               optimizedOrders:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The new combined order created after optimization
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Optimization confirmed"
 *                 newOrder:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request body or no optimized orders provided
 */

router.post('/suggest', suggestOptimization);
router.post('/confirm', confirmOptimization);

export default router;