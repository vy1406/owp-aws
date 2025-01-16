const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

exports.handler = async (event) => {
    const token = event.headers?.Authorization;

    if (!token) {
        return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) };
    }

    try {
        jwt.verify(token, SECRET);
        const data = JSON.parse(event.body);
        const id = uuidv4();

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Item: { id, ...data },
        };

        await dynamoDB.put(params).promise();
        return { statusCode: 201, body: JSON.stringify({ id }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
};
