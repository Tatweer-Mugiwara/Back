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
 *         - truck
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
 *         truck:
 *           type: string
 *           description: The ID of the truck associated with the report.
 *       example:
 *         condition: Speed is null for 10 minutes
 *         capteur: Sensor1
 *         description: The sensor is functioning properly.
 *         truck: 60d21b4667d0d8992e610c85
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
    truck: {
        type: Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
}, { timestamps: true });

const Report = model('Report', reportSchema);

export default Report;
