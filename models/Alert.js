import { Schema, model } from "mongoose"
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
 *           description: The actual condition of the alert (in Alert we have the intial condition, here we can store the system exact capture infos or the value exceeded until the the alert is resolved).
 *         initiator:
 *           type: string
 *           description: The user who initiated the alert.
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the alert was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the alert was last updated.
 *       example:
 *         condition: Critical
 *         initiator: 60d0fe4f5311236168a109ca
 *         description: The system detected the absence of the devlivery ship when checking at 9AM (in which it should've been arrived long time before the date mentioned).
 *         isResolved: false
 *         history: [60d0fe4f5311236168a109cb, 60d0fe4f5311236168a109cc]
 *         createdAt: 2023-10-01T12:00:00Z
 *         updatedAt: 2023-10-01T12:00:00Z
 */

const alertSchema = new Schema({
    actualCondition: {
        type: String,
        required: true
    },
    initiator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    history: [{
        type: Schema.Types.ObjectId,
        ref: 'History'
    }]
}, { timestamps: true });

const Alert = model('Alert', alertSchema);

export default Alert;
