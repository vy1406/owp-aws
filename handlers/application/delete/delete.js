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
        const { id } = JSON.parse(event.body);

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Key: { id },
        };

        await dynamoDB.delete(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Deleted successfully' }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
};
