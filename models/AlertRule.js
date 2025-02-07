import { Schema, model } from "mongoose"
/**
 * @swagger
 * components:
 *   schemas:
 *     AlertRule:
 *       type: object
 *       required:
 *         - condition
 *       properties:
 *         condition:
 *           type: string
 *           description: The condition of the alert.
 *         initiator:
 *           type: string
 *           description: The user who initiated the alert.
 *         description:
 *           type: string
 *           description: Additional description of the alert.
 *         alerts:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of an alert associated with this rule.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the alert was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the alert was last updated.
 *       example:
 *         condition: ((CAPTURE(Time) > 9AM) AND (STOCK_DATA_LENGTH > 10kg)) //will be handled by the system and the interface
 *         initiator: 60d0fe4f5311236168a109ca
 *         description: The system detected the absence of the delivery ship when checking at 9AM (in which it should've arrived long time before the date mentioned).
 *         alerts: [60d0fe4f5311236168a109cb, 60d0fe4f5311236168a109cc]
 *         createdAt: 2023-10-01T12:00:00Z
 *         updatedAt: 2023-10-01T12:00:00Z
 */

const alertRuleSchema = new Schema({
    condition: {
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
    alerts: [{
        type: Schema.Types.ObjectId,
        ref: 'Alert'
    }]
}, { timestamps: true });

const AlertRule = model('AlertRule', alertRuleSchema);

export default AlertRule;
