import { Router } from "express";
import captionsControllers from "../controllers/captionsControllers.js";

const { createCaption, getTruckCaptions } = captionsControllers;

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Captions
 *     description: API endpoints for managing captions
 *
 * /api/v1/captions:
 *   post:
 *     summary: Create a new caption
 *     tags: [Captions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caption'
 *     responses:
 *       201:
 *         description: The newly created caption
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caption'
 *       400:
 *         description: Invalid request body
 *
 * /api/v1/captions/{tid}:
 *   get:
 *     summary: Get captions for a specific truck
 *     tags: [Captions]
 *     parameters:
 *       - in: path
 *         name: tid
 *         schema:
 *           type: string
 *         required: true
 *         description: The truck ID
 *     responses:
 *       200:
 *         description: List of captions for the specified truck
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caption'
 *       404:
 *         description: Truck not found
 */

router.get('/:tid', getTruckCaptions);

router.post('/', createCaption);

export default router;
