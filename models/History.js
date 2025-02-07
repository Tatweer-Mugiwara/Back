import { Schema, model } from "mongoose"
/**
 * @swagger
 * components:
 *   schemas:
 *     History:
 *       type: object
 *       required:
 *         - action
 *       properties:
 *         action:
 *           type: string
 *           description: The action performed.
 *         actor:
 *           type: string
 *           description: The ID of the user who have been involved.
 *         issuer:
 *           type: string
 *           description: The ID of the user who performed the action.
 *         description:
 *           type: string
 *           description: Additional description of the action.
 *         alert:
 *           type: string
 *           description: Alert related.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the history record was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the history record was last updated.
 *       example:
 *         action: Update the alert
 *         actor: 60d0fe4f5311236168a109ca
 *         issuer: 10d0fe4f5311236168a109cb
 *         alert: 52d0fe4f5311236168a109cb
 *         description: The reponsability has been affected to another person directly.
 *         createdAt: 2023-10-01T12:34:56.789Z
 *         updatedAt: 2023-10-01T12:34:56.789Z
 */

const historySchema = new Schema({
    action: {
        type: String,
        required: true
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    issuer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String
    },
    alert: {
        type: Schema.Types.ObjectId,
        ref: 'Alert'
    }
}, { timestamps: true });

const History = model('History', historySchema);

export default History;
