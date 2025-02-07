import {
    Router
} from "express";
import alertsControllers from '../controllers/alertsControllers.js'

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: API endpoints for managing alerts
 * /api/v1/alerts:
 *   get:
 *     summary: Get all alerts.
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: A list of alerts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alert'
 *       404:
 *         description: No alerts found.
 *   post:
 *     summary: Create a new alert.
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alert'
 *     responses:
 *       200:
 *         description: The newly created alert.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *       400:
 *         description: Invalid request body.
 * /api/v1/alerts/{id}:
 *   get:
 *     summary: Get a single alert by ID.
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert to retrieve.
 *     responses:
 *       200:
 *         description: The alert.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *       404:
 *         description: Alert not found.
 *   delete:
 *     summary: Delete an alert by ID.
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert to delete.
 *     responses:
 *       200:
 *         description: The deleted alert.
 *       404:
 *         description: Alert not found.
 * /api/v1/alerts/{id}/history:
 *   post:
 *     summary: Insert history into an alert by ID.
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/History'
 *     responses:
 *       200:
 *         description: The updated alert with history.
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Alert not found.
 */

const {
    getAlerts,
    getSingleAlert,
    createAlert,
    insertHistoryInAlert,
    deleteAlert
} = alertsControllers

const router = Router();

router.get('/', getAlerts);

router.get('/:id', getSingleAlert);

router.post('/', createAlert);

router.post('/:id/history', insertHistoryInAlert);

router.delete('/:id', deleteAlert);

export default router;