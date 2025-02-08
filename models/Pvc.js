import { Schema, model } from "mongoose";

/**
 * @swagger
 * components:
 *  schemas:
 *   PVC:
 *    type: object
 *    required:
 *      - cities
 *      - matrix
 *      - size
 *    properties:
 *      cities:
 *          type: array
 *          items:
 *              type: string
 *          description: The list of cities in the tsp problem, the order is important for the matrix property and the first city is the origin.
 *      matrix:
 *          type: array
 *          items:
 *              type: array
 *              items:
 *                  type: number
 *          description: The matrix of costs between the cities in the list property. The cost is the number of estimated minutes between these cities got by the google maps api.
 *      size:
 *          type: number
 *          description: The size of the supposed collected data.
 *
 */

const PvcSchema = new Schema(
  {
    cities: [
      {
        type: String,
        required: true,
      },
    ],
    matrix: [
      [
        {
          type: Number,
          required: true,
        },
      ],
    ],
    size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PVC = model("PVC", PvcSchema);

export default PVC;
