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
 *           required: true
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
 */

const alertSchema = new Schema({
    actualCondition: {
        type: String,
        required: true
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
    }],
    alertRule: {
        type: Schema.Types.ObjectId,
        ref: 'AlertRule',
        required: true
    }
}, { timestamps: true });

const Alert = model('Alert', alertSchema);

export default Alert;
