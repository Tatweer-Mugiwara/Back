import { Router } from "express";
import historiesControllers from '../controllers/historiesControllers.js'

/**
 * @swagger
 * tags:
 *   name: Histories
 *   description: API endpoints for managing histories
 * /api/v1/histories:
 *   get:
 *     summary: Get all histories.
 *     tags: [Histories]
 *     responses:
 *       200:
 *         description: A list of histories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/History'
 *       404:
 *         description: No histories found.
 *   post:
 *     summary: Create a new history.
 *     tags: [Histories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *       200:
 *         description: The newly created history.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       400:
 *         description: Invalid request body.
 * /api/v1/histories/{id}:
 *   get:
 *     summary: Get a single history by ID.
 *     tags: [Histories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the history to retrieve.
 *     responses:
 *       200:
 *         description: The history.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       404:
 *         description: History not found.
 *   patch:
 *     summary: Update a history by ID.
 *     tags: [Histories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the history to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *       200:
 *         description: The updated history.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/History'
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: History not found.
 *   delete:
 *     summary: Delete a history by ID.
 *     tags: [Histories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the history to delete.
 *     responses:
 *       200:
 *         description: The deleted history.
 *       404:
 *         description: History not found.
 */

const { createHistory, deleteHistory, getHistories, getSingleHistory, updateHistory } = historiesControllers

const router = Router();

router.get('/:aid', getHistories);

router.get('/:id', getSingleHistory);

router.patch('/:id', updateHistory);

router.post('/', createHistory);

router.delete('/:id', deleteHistory);

export default router;
