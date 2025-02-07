import { Schema, model } from "mongoose"
/**
 * @swagger
 * components:
 *   schemas:
 *     Caption:
 *       type: object
 *       required:
 *         - key
 *         - value
 *         - type
 *         - capteur
 *       properties:
 *         key:
 *           type: string
 *           description: The key of the caption.
 *         value:
 *           type: mixed
 *           description: The value of the caption.
 *         type:
 *           type: string
 *           enum: ['route', 'usine']
 *           description: The type of the caption.
 *         capteur:
 *           type: string
 *           description: The ID of the associated capteur.
 *         truck:
 *           type: string
 *           description: The ID of the associated truck.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the caption was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the caption was last updated.
 *       example:
 *         key: temperature
 *         value: 22.5 degree
 *         type: usine // this is related to the alerts in the usine (part 4 of the challenge) or to the reports in the road (part 3 of the challenge)
 *         capteur: 60d0fe4f5311236168a109cd
 *         truck: 60d0fe4f5311236168a109ce
 *         createdAt: 2023-10-01T12:00:00Z
 *         updatedAt: 2023-10-01T12:00:00Z
 */

const captionSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['route', 'usine'], //route: caption sur la route (partie 3 de challenge), usine: synchronisation entre les partie (partie 4 de challenge)
    },
    capteur: {
        type: Schema.Types.ObjectId,
        ref: 'Capteur',
        required: true
    },
    truck: {
        type: Schema.Types.ObjectId,
        ref: 'Truck'
    }
}, { timestamps: true });

const Caption = model('Caption', captionSchema);

export default Caption;
