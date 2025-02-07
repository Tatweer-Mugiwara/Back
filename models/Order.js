import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - client
 *         - weight
 *         - destination
 *         - status
 *       properties:
 *         client:
 *           type: string
 *           description: The name or ID of the client placing the order.
 *         weight:
 *           type: number
 *           description: The weight of the order in tons.
 *         destination:
 *           type: string
 *           description: The city where the order needs to be delivered.
 *         truck:
 *           type: string
 *           description: The truck assigned to the order. If null, the order is not yet assigned.
 *         truckMaxWeight:
 *           type: number
 *           description: The maximum weight capacity of the assigned truck.
 *         status:
 *           type: string
 *           enum: [ "pending", "assigned", "on_trip", "delivered" ]
 *           description: The current status of the order.
 *         departureTime:
 *           type: string
 *           format: date-time
 *           description: The departure time of the truck carrying the order.
 *       example:
 *         client: "Client A"
 *         weight: 150
 *         destination: "City A"
 *         truck: "TRUCK123"
 *         truckMaxWeight: 200
 *         status: "assigned"
 *         departureTime: "2024-07-30T08:00:00Z"
 */

const orderSchema = new Schema({
    client: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    truck: {
        type: Schema.Types.ObjectId,
        ref: "Truck",
        default: null
    },
    truckMaxWeight: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ["pending", "assigned", "on_trip", "delivered"],
        default: "pending"
    },
    departureTime: {
        type: Date,
        required: false
    }
}, { timestamps: true });

const Order = model('Order', orderSchema);

export default Order;
