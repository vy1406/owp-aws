const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);

        if (!username || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing username or password' }),
            };
        }

        const params = {
            TableName: 'UsersTable',
            Item: { username, password },
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User created successfully' }),
        };
    } catch (error) {
        console.error('Error in signup handler:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error', error }),
        };
    }
};
