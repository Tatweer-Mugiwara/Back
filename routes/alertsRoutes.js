import {
    Router
} from "express";
import alertsControllers from '../controllers/alertsControllers.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Alert:
 *       type: object
 *       required:
 *         - actualCondition
 *       properties:
 *         actualCondition:
 *           type: string
 *           description: The actual condition of the alert (in Alert we have the initial condition, here we can store the system exact capture infos or the value exceeded until the alert is resolved).
 *         description:
 *           type: string
 *           description: Additional description of the alert.
 *         isResolved:
 *           type: boolean
 *           description: Indicates if the alert is resolved.
 *         history:
 *           type: array
 *           items:
 *             type: string
 *           description: History of the alert, the set of updates that happened on it.
 *         alertRule:
 *           type: string
 *           description: The rule that triggered the alert.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the alert was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the alert was last updated.
 *       example:
 *         actualCondition: Critical
 *         description: The system detected the absence of the delivery ship when checking at 9AM (in which it should've arrived long time before the date mentioned).
 *         isResolved: false
 *         history: [60d0fe4f5311236168a109cb, 60d0fe4f5311236168a109cc]
 *         alertRule: 60d0fe4f5311236168a109cd
 *         createdAt: 2023-10-01T12:00:00Z
 *         updatedAt: 2023-10-01T12:00:00Z
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