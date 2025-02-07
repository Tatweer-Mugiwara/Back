import { Schema, model } from "mongoose"
/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - condition
 *         - capteur
 *       properties:
 *         condition:
 *           type: string
 *           description: The condition of the report, related to speed, temperature, time...
 *         capteur:
 *           type: string
 *           description: The capteur associated with the report.
 *         description:
 *           type: string
 *           description: Additional description of the report.
 *       example:
 *         condition: Speed is null for 10 minutes
 *         capteur: Sensor1
 *         description: The sensor is functioning properly.
 */

const reportSchema = new Schema({
    condition: {
        type: String,
        required: true
    },
    capteur: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
}, { timestamps: true });

const Report = model('Report', reportSchema);

export default Report;
