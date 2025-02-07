import { Schema, model } from "mongoose"
/**
 * @swagger
 * components:
 *   schemas:
 *     Capteur:
 *       type: object
 *       required:
 *         - reference
 *         - code
 *       properties:
 *         reference:
 *           type: string
 *           description: The reference of the capteur.
 *         code:
 *           type: string
 *           description: The code of the capteur.
 *         description:
 *           type: string
 *           description: Additional description of the capteur.
 *       example:
 *         reference: REF123
 *         code: CODE456
 *         description: This is a sample capteur for heat.
 */

const capteurSchema = new Schema({
    reference: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
}, { timestamps: true });

const Capteur = model('Capteur', capteurSchema);

export default Capteur;
