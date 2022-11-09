const express = require('express');
const { getAllConcerts, getConcertById, registerConcert, removeConcert, updateConcert } = require('../src/dataBase/concertDB');
const concertRoute = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      Concert:
 *          type: object
 *          properties:
 *              location:
 *                  type: string
 *                  description: the concert location
 *              date:
 *                  type: string
 *                  description: the concert date
 *              stadium:
 *                  type: string
 *                  description: the concert stadium
 *              tour:
 *                  type: string
 *                  description: the concert tour
 *          required:
 *              - location
 *              - date
 *              - stadium
 *              - tour
 *          example:
 *              location: 'Bolivia'
 *              date: '25-05-2023'
 *              stadium: 'Hernando Siles'
 *              tour: '12345'
 */

/**
 * @swagger
 * /api/concerts:
 *  get:
 *      summary: Return all concerts
 *      tags: [Concert]
 *      responses:
 *          200:
 *              description: get all concerts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 */

concertRoute.get('/concerts', async (req, res) => {
    const { success, data } = await getAllConcerts()

    if (success) {
        return res.status(200).json({ success, data, code: 200 })
    }
    return res.status(500).json({ success: false, messsage: "Error", code: 500 })
})


/**
 * @swagger
 * /api/concert/{sortId}:
 *  get:
 *      summary: Return a concert
 *      tags: [Concert]
 *      parameters:
 *          - in: path
 *            name: sortId
 *            schema:
 *                  type: string
 *            required: true
 *            description: the concert id 
 *      responses:
 *          200:
 *              description: get one concert
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          404:
 *              description: concert not found!
 */

concertRoute.get("/concert/:sortId", async (req, res) => {
    const { sortId } = req.params;
    const { success, data } = await getConcertById(sortId);
    if (success) {
        return res.status(200).json({ success, data, code: 200 });
    }

    return res.status(500).json({ success: false, message: "Error", code: 500 });
});

/**
 * @swagger
 * /api/concert/createConcert:
 *  post:
 *      summary: Create a new concert
 *      tags: [Concert]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Concert'
 *      responses:
 *          201:
 *              description: new concert created!
 * 
 */

concertRoute.post('/concert/createConcert', async (req, res) => {
    const { success } = await registerConcert(req.body)
    if (success) {
        return res.status(201).json({ success, message: 'Register success!!!', code: 201 })
    }
    return res.status(500).json({ success: false, message: 'Error', code: 500 })
})

/**
 * @swagger
 * /api/concert/{sortId}:
 *  delete:
 *      summary: delete a concert
 *      tags: [Concert]
 *      parameters:
 *          - in: path
 *            name: sortId
 *            schema:
 *                  type: string
 *            required: true
 *            description: the concert is deleting 
 *      responses:
 *          200:
 *              description: concert deleted
 *          404:
 *              description: concert not found!
 */

concertRoute.delete('/concert/:sortId', async (req, res) => {
    const { sortId } = req.params;
    const { success } = await removeConcert(sortId)
    if (success) {
        return res.status(200).json({ success, code: 200 })
    }
    return res.status(500).json({ success: false, message: 'Error', code: 500 })
})


/**
* @swagger
* /api/concert/{sortId}:
*  put:
*      summary: update a concert
*      tags: [Concert]
*      parameters:
*          - in: path
*            name: sortId
*            schema:
*               type: string
*            required: true
*            description: the concert is update 
*      requestBody:
*          required: true
*          content:
*              application/json:
*               schema:
*                  type: object
*                  $ref: '#/components/schemas/Concert'
*      responses:
*          200:
*              description: concert update!
*          400:
*              description: concert not found!
* 
*/

concertRoute.put('/concert/:sortId', async (req, res) => {
    const { sortId } = req.params;
    const { success } = await updateConcert(sortId, req.body)
    if (success) {
        return res.status(200).json({ success, message: 'Update success!!!', code: 201 })
    }
    return res.status(500).json({ success: false, message: 'Error', code: 500 })
})
module.exports = concertRoute;