const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

exports.handler = async (event) => {
    const token = event.headers?.Authorization;

    if (!token) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };
    }

    try {
        jwt.verify(token, SECRET);
        const { id } = event.pathParameters;

        if (!id) {
            return { statusCode: 400, body: JSON.stringify({ message: 'Missing id' }) };
        }

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Key: { id },
        };

        const result = await dynamoDB.get(params).promise();

        if (!result.Item) {
            return { statusCode: 404, body: JSON.stringify({ message: 'Item not found' }) };
        }

        return { statusCode: 200, body: JSON.stringify(result.Item) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
