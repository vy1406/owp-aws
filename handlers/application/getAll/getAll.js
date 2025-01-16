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
        const queryParams = event.queryStringParameters || {};

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            FilterExpression: '',
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
        };

        if (queryParams.status) {
            params.FilterExpression += '#status = :status';
            params.ExpressionAttributeNames['#status'] = 'status';
            params.ExpressionAttributeValues[':status'] = queryParams.status;
        }

        if (queryParams.submission_city) {
            if (params.FilterExpression) params.FilterExpression += ' AND ';
            params.FilterExpression += '#submission_city = :submission_city';
            params.ExpressionAttributeNames['#submission_city'] = 'submission_city';
            params.ExpressionAttributeValues[':submission_city'] = queryParams.submission_city;
        }

        const result = await dynamoDB.scan(params).promise();

        return { statusCode: 200, body: JSON.stringify(result.Items) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
