import { Router } from "express";
import alertRulesControllers from '../controllers/alertRulesControllers.js'

/**
 * @swagger
 * tags:
 *   name: AlertRules
 *   description: API endpoints for managing alert rules
 * /api/v1/alert-rules:
 *   get:
 *     summary: Get all alert rules.
 *     tags: [AlertRules]
 *     responses:
 *       200:
 *         description: A list of alert rules.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AlertRule'
 *       404:
 *         description: No alert rules found.
 *   post:
 *     summary: Create a new alert rule.
 *     tags: [AlertRules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlertRule'
 *     responses:
 *       200:
 *         description: The newly created alert rule.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlertRule'
 *       400:
 *         description: Invalid request body.
 * /api/v1/alert-rules/{id}:
 *   get:
 *     summary: Get a single alert rule by ID.
 *     tags: [AlertRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert rule to retrieve.
 *     responses:
 *       200:
 *         description: The alert rule.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlertRule'
 *       404:
 *         description: Alert rule not found.
 *   patch:
 *     summary: Update an alert rule by ID.
 *     tags: [AlertRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert rule to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlertRule'
 *     responses:
 *       200:
 *         description: The updated alert rule.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlertRule'
 *       400:
 *         description: Invalid request body.
 *       404:
 *         description: Alert rule not found.
 *   delete:
 *     summary: Delete an alert rule by ID.
 *     tags: [AlertRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert rule to delete.
 *     responses:
 *       200:
 *         description: The deleted alert rule.
 *       404:
 *         description: Alert rule not found.
 * /api/v1/alert-rules/{id}/alert-now:
 *   post:
 *     summary: Trigger and Create an alert for the rule that has the {id} when the condition satisfied.
 *     tags: [AlertRules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the alert rule to trigger.
 *     responses:
 *       200:
 *         description: Alert triggered successfully.
 *       404:
 *         description: Alert rule not found.
 */

const {
    getAlertRules,
    getSingleAlertRule,
    createAlertRule,
    updateAlertRule,
    deleteAlertRule,
    alertNow
} = alertRulesControllers

const router = Router();

router.get('/', getAlertRules);

router.get('/:id', getSingleAlertRule);

router.post('/', createAlertRule);

router.post('/:id/alert-now', alertNow);

router.patch('/:id', updateAlertRule);

router.delete('/:id', deleteAlertRule);

export default router;
