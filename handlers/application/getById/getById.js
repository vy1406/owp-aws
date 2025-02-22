const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
}


exports.handler = async (event) => {

    try {
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

        return { statusCode: 200, headers, body: JSON.stringify({ application: result.Item }) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ message: 'Failed fetching application' }) };
    }
};
