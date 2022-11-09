const AWS = require("aws-sdk");
const { v4: uuidv4 } = require('uuid');
const { AwsConfig } = require('../config/credentials');

const tableName = "TourExample";
const PartitionKey = 'CONCERT';
AWS.config.update(AwsConfig);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getAllConcerts = async () => {
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

async function getConcertById(id) {
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


async function registerConcert(bodyRequest) {
    const params = {
        TableName: tableName,
        Item: {
            id: PartitionKey,
            sortid: PartitionKey + '-' + uuidv4(),
            location: bodyRequest.location,
            date: bodyRequest.date,
            stadium: bodyRequest.stadium,
            tour: bodyRequest.tour,
        }
    }
    try {
        await dynamoDB.put(params).promise()
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}


async function removeConcert(sortId) {
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

async function updateConcert(sortId, bodyRequest) {
    const params = {
        TableName: tableName,
        Item: {
            id: PartitionKey,
            sortid: sortId,
            location: bodyRequest.location,
            date: bodyRequest.date,
            stadium: bodyRequest.stadium,
            tour: bodyRequest.tour
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
    getAllConcerts,
    registerConcert,
    getConcertById,
    removeConcert,
    updateConcert
}