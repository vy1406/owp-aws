const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

exports.handler = async (event) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            statusCode: 401,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            },
            body: JSON.stringify({ message: 'Unauthorized' })
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
            statusCode: 201, headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            },
            body: JSON.stringify({ id })
        };
    } catch (error) {
        return {
            statusCode: 500, headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            }, body: JSON.stringify({ message: error.message })
        };
    }
};

