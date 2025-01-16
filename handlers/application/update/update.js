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
        const data = JSON.parse(event.body);

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Key: { id: data.id },
            UpdateExpression: 'SET #additional_info = :additional_info, #status = :status',
            ExpressionAttributeNames: { '#additional_info': 'additional_info', '#status': 'status' },
            ExpressionAttributeValues: {
                ':additional_info': data.additional_info,
                ':status': data.status,
            },
            ReturnValues: 'UPDATED_NEW',
        };

        const result = await dynamoDB.update(params).promise();
        return { statusCode: 200, body: JSON.stringify(result.Attributes) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
};