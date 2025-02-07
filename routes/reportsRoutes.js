import { Router } from "express";
import reportsControllers from '../controllers/reportsControllers.js'

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API endpoints for managing reports
 * /api/v1/reports:
 *   get:
 *     summary: Get all reports.
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: A list of reports.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       404:
 *         description: No reports found.
 *   post:
 *     summary: Create a new report.
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: The newly created report.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Invalid request body.
 * /api/v1/reports/{id}:
 *   get:
 *     summary: Get a single report by ID.
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to retrieve.
 *     responses:
 *       200:
 *         description: The report.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Report not found.
 *   delete:
 *     summary: Delete a report by ID.
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to delete.
 *     responses:
 *       200:
 *         description: The deleted report.
 *       404:
 *         description: Report not found.
 */

const { getReports, getSingleReport, createReport, deleteReport } = reportsControllers

const router = Router();

router.get('/', getReports);

router.get('/:id', getSingleReport);

router.post('/', createReport);

router.delete('/:id', deleteReport);

export default router;
