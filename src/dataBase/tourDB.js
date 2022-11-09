const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { AwsConfig } = require('../config/credentials');

const tableName = "TourExample";
const PartitionKey = 'TOUR';
AWS.config.update(AwsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getAllTours = async () => {
    const params = {
        TableName: tableName,
        Key: {
            id: PartitionKey,
        },
    }

    try {
        const { Items = [] } = await dynamoDB.scan(params).promise()
        return { success: true, data: Items }
    } catch (error) {
        return { success: false, data: null }
    }
}

async function getTourById(id) {
    const params = {
        TableName: tableName,
        Key: {
            id: PartitionKey,
            sortid: id
        },
    };
    try {
        const { Item = {} } = await dynamoDB.get(params).promise();
        return { success: true, data: Item };
    } catch (error) {
        return { success: false, data: null };
    }
}

async function registerTour(bodyRequest) {
    const params = {
        TableName: tableName,
        Item: {
            id: PartitionKey,
            sortid: PartitionKey + '-' + uuidv4(),
            year: parseInt(bodyRequest.year),
            name: bodyRequest.name,
            codeBand: bodyRequest.band
        }
    }
    try {
        await dynamoDB.put(params).promise()
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}

async function removeTour(sortId) {
    var params = {
        TableName: tableName,
        Key: {
            id: PartitionKey,
            sortid: sortId
        }
    }

    try {
        await dynamoDB.delete(params).promise();
        return { success: true }
    } catch (err) {
        return { success: false }
    }
}

async function updateTour(sortId, bodyRequest) {
    const params = {
        TableName: tableName,
        Item: {
            id: PartitionKey,
            sortid: sortId,
            year: parseInt(bodyRequest.year),
            name: bodyRequest.name,
            band: bodyRequest.band
        }
    }
    try {
        await dynamoDB.put(params).promise()
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}


module.exports = {
    getAllTours,
    getTourById,
    registerTour,
    removeTour,
    updateTour
}