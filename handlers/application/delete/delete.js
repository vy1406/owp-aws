const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

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
    } catch {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }

    try {
        const { id } = JSON.parse(event.body);

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Key: { id },
        };

        await dynamoDB.delete(params).promise();
        return { statusCode: 200, headers, body: JSON.stringify({ message: 'Deleted successfully' }) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ message: 'Error deleting application' }) };
    }
};
