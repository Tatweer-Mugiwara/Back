import {
    Router
} from "express";
import binPackingControllers from '../controllers/binPackingControllers.js'

/**
 * @swagger
 * /api/v1/bin-packing-3d:
 *   post:
 *     summary: Perform 3D bin packing
 *     description: This endpoint performs 3D bin packing based on the provided input.
 *     tags:
 *       - Bin Packing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bins:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     width:
 *                       type: number
 *                     length:
 *                       type: number
 *                     height:
 *                       type: number
 *                     weight:
 *                       type: number
 *                     totalWidth:
 *                       type: number
 *                     totalHeight:
 *                       type: number
 *                     totalLength:
 *                       type: number
 *                     boxes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           index:
 *                             type: number
 *                           position:
 *                             type: object
 *                             properties:
 *                               x:
 *                                 type: number
 *                               y:
 *                                 type: number
 *                               z:
 *                                 type: number
 *     responses:
 *       200:
 *         description: Successfully performed bin packing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       width:
 *                         type: number
 *                       length:
 *                         type: number
 *                       height:
 *                         type: number
 *                       weight:
 *                         type: number
 *                       totalWidth:
 *                         type: number
 *                       totalHeight:
 *                         type: number
 *                       totalLength:
 *                         type: number
 *                       boxes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             index:
 *                               type: number
 *                             position:
 *                               type: object
 *                               properties:
 *                                 x:
 *                                   type: number
 *                                 y:
 *                                   type: number
 *                                 z:
 *                                   type: number
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

const { binPacking3D } = binPackingControllers

const router = Router();

router.post('/', binPacking3D);

export default router;