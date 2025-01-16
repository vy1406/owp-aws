const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
}

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

exports.handler = async (event) => {
    const authHeader = event.headers?.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, SECRET);
        const { id } = event.pathParameters;

        if (!id) {
            return { statusCode: 400, headers, body: JSON.stringify({ message: 'Missing id' }) };
        }

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Key: { id },
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return { statusCode: 404, headers, body: JSON.stringify({ message: 'Item not found' }) };
        }

        return { statusCode: 200, headers, body: JSON.stringify(result.Item) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
    }
};
