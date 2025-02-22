const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};
exports.handler = async (event) => {

    const authHeader = event.headers?.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ message: 'Must be logged in.' })
        };
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, SECRET);
        const data = JSON.parse(event.body);
        const id = uuidv4();

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Item: { id, ...data },
        };

        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            headers,
            body: JSON.stringify({ id })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: 'Error creating application' })
        };
    }
};

