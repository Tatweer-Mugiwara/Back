import { Router } from "express";
import trucksControllers from "../controllers/trucksControllers.js";

const { getTrucks, createTruck, getTruckById, updateTruck, deleteTruck } = trucksControllers;

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Trucks
 *     description: API endpoints for managing trucks
 *
 * /api/v1/trucks:
 *   get:
 *     summary: Get all trucks
 *     tags: [Trucks]
 *     responses:
 *       200:
 *         description: A list of trucks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Truck'
 *       404:
 *         description: No trucks found
 *   post:
 *     summary: Create a new truck
 *     tags: [Trucks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Truck'
 *     responses:
 *       201:
 *         description: The newly created truck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       400:
 *         description: Invalid request body
 *
 * /api/v1/trucks/{truckId}:
 *   get:
 *     summary: Get a single truck by ID
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the truck to retrieve
 *     responses:
 *       200:
 *         description: The truck details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       404:
 *         description: Truck not found
 *   patch:
 *     summary: Update a truck by ID
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the truck to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Truck'
 *     responses:
 *       200:
 *         description: The updated truck
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Truck'
 *       404:
 *         description: Truck not found
 *   delete:
 *     summary: Delete a truck by ID
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: truckId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the truck to delete
 *     responses:
 *       204:
 *         description: Truck deleted successfully
 *       404:
 *         description: Truck not found
 */

router.get('/', getTrucks);

router.post('/', createTruck);

router.get('/:id', getTruckById);

router.patch('/:id', updateTruck);

router.delete('/:id', deleteTruck);

export default router;
