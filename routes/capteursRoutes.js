import { Router } from "express";
import capteursControllers from "../controllers/capteursControllers.js";

const { getCapteurs, createCapteur, getCapteurById, updateCapteur, deleteCapteur } = capteursControllers;

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Capteurs
 *     description: API endpoints for managing capteurs
 *
 * /api/v1/capteurs:
 *   get:
 *     summary: Get all capteurs
 *     tags: [Capteurs]
 *     responses:
 *       200:
 *         description: A list of capteurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Capteur'
 *       404:
 *         description: No capteurs found
 *   post:
 *     summary: Create a new capteur
 *     tags: [Capteurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Capteur'
 *     responses:
 *       201:
 *         description: The newly created capteur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Capteur'
 *       400:
 *         description: Invalid request body
 *
 * /api/v1/capteurs/{capteurId}:
 *   get:
 *     summary: Get a single capteur by ID
 *     tags: [Capteurs]
 *     parameters:
 *       - in: path
 *         name: capteurId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the capteur to retrieve
 *     responses:
 *       200:
 *         description: The capteur details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Capteur'
 *       404:
 *         description: Capteur not found
 *   patch:
 *     summary: Update a capteur by ID
 *     tags: [Capteurs]
 *     parameters:
 *       - in: path
 *         name: capteurId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the capteur to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Capteur'
 *     responses:
 *       200:
 *         description: The updated capteur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Capteur'
 *       404:
 *         description: Capteur not found
 *   delete:
 *     summary: Delete a capteur by ID
 *     tags: [Capteurs]
 *     parameters:
 *       - in: path
 *         name: capteurId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the capteur to delete
 *     responses:
 *       204:
 *         description: Capteur deleted successfully
 *       404:
 *         description: Capteur not found
 */

router.get('/', getCapteurs);

router.post('/', createCapteur);

router.get('/:capteurId', getCapteurById);

router.patch('/:capteurId', updateCapteur);

router.delete('/:capteurId', deleteCapteur);

export default router;
