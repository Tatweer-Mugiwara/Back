import { Schema, model } from "mongoose"
/**
 * @swagger
 * components:
 *   schemas:
 *     Truck:
 *       type: object
 *       required:
 *         - matricule
 *         - driver
 *         - currentLocation
 *       properties:
 *         matricule:
 *           type: string
 *           description: The matricule of the truck.
 *         driver:
 *           type: string
 *           description: The ID of the driver (reference to User model).
 *         capteurs:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of the capteur (reference to Capteur model).
 *         currentLocation:
 *           type: object
 *           required:
 *             - type
 *             - coordinates
 *           properties:
 *             type:
 *               type: string
 *               enum: ['Point']
 *               description: The type of the location (should be 'Point').
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: The coordinates of the current location.
 *       example:
 *         matricule: ABC123
 *         driver: 60d0fe4f5311236168a109ca
 *         capteurs: [60d0fe4f5311236168a109cb, 60d0fe4f5311236168a109cc]
 *         currentLocation:
 *           type: Point
 *           coordinates: [40.7128, -74.0060]
 */

const truckSchema = new Schema({
    matricule: {
        type: String,
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'User', //set the reference to the User model to get the driver details, can be improved by adding a driver role after MVP
        required: true
    },
    capteurs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Capteur'
        }
    ],
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    
}, { timestamps: true });

const Truck = model('Truck', truckSchema);

export default Truck;
