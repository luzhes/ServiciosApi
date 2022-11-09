const express = require('express');
const { getAllTours, getTourById, registerTour, removeTour, updateTour } = require('../src/dataBase/tourDB');
const tourRoute = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Tour:
 *          type: object
 *          properties:
 *              year:
 *                  type: integer
 *                  description: the tour year
 *              name:
 *                  type: string
 *                  description: the tour name
 *              band:
 *                  type: string
 *                  description: the band code
 *          required:
 *              - year
 *              - name
 *              - band
 *          example:
 *              year: 2022
 *              name: 'Latidos'
 *              band: 'THE SCRIPT'
 *  
 */

/**
 * @swagger
 * /api/tours:
 *  get:
 *      summary: Return all tours
 *      tags: [Tour]
 *      responses:
 *          200:
 *              description: get all Tours
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */

tourRoute.get('/tours', async (req, res) => {
    const { success, data } = await getAllTours()

    if (success) {
        return res.status(200).json({ success, data, code: 200 })
    }
    return res.status(500).json({ success: false, messsage: "Error", code: 500 })
})

/**
 * @swagger
 * /api/tour/{sortId}:
 *  get:
 *      summary: Return a tour
 *      tags: [Tour]
 *      parameters:
 *          - in: path
 *            name: sortId
 *            schema:
 *                  type: string
 *            required: true
 *            description: the tour id 
 *      responses:
 *          200:
 *              description: get one Tour
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          404:
 *              description: tour not found!
 */

tourRoute.get("/tour/:sortId", async (req, res) => {
    const { sortId } = req.params;
    const { success, data } = await getTourById(sortId);
    if (success) {
        return res.status(200).json({ success, data, code: 200 });
    }

    return res.status(500).json({ success: false, message: "Error", code: 500 });
});

/**
 * @swagger
 * /api/tour/createTour:
 *  post:
 *      summary: Create a new tour
 *      tags: [Tour]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Tour'
 *      responses:
 *          201:
 *              description: new tour created!
 * 
 */

tourRoute.post('/tour/createTour', async (req, res) => {
    const { success } = await registerTour(req.body)
    if (success) {
        return res.status(201).json({ success, message: 'Register success!!!', code: 201 })
    }
    return res.status(500).json({ success: false, message: 'Error', code: 500 })
})

/**
 * @swagger
 * /api/tour/{sortId}:
 *  delete:
 *      summary: delete a tour
 *      tags: [Tour]
 *      parameters:
 *          - in: path
 *            name: sortId
 *            schema:
 *                  type: string
 *            required: true
 *            description: the tour is deleting 
 *      responses:
 *          200:
 *              description: tour deleted
 *          404:
 *              description: tour not found!
 */
tourRoute.delete('/tour/:sortId', async (req, res) => {
    const { sortId } = req.params;
    const { success } = await removeTour(sortId)
    if (success) {
        return res.status(200).json({ success, code: 200 })
    }
    return res.status(500).json({ success: false, message: 'Error', code: 500 })
});


/**
* @swagger
* /api/tour/{sortId}:
*  put:
*      summary: update a tour
*      tags: [Tour]
*      parameters:
*          - in: path
*            name: sortId
*            schema:
*               type: string
*            required: true
*            description: the tour is update 
*      requestBody:
*          required: true
*          content:
*              application/json:
*               schema:
*                  type: object
*                  $ref: '#/components/schemas/Tour'
*      responses:
*          200:
*              description: tour update!
*          400:
*              description: tour not found!
* 
*/

tourRoute.put('/tour/:sortId', async (req, res) => {
    const { sortId } = req.params;
    const { success } = await updateTour(sortId, req.body)
    if (success) {
        return res.status(200).json({ success, message: 'Update success!!!', code: 201 })
    }
    return res.status(500).json({ success: false, message: 'Error', code: 500 })
})

module.exports = tourRoute;