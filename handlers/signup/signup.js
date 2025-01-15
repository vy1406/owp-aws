const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);

        if (!username || !password) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ message: 'Missing username or password' }),
            };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const params = {
            TableName: 'UsersTable',
            Item: { username, password: hashedPassword },
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'User created successfully' }),
        };
    } catch (error) {
        console.error('Error in signup handler:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'Internal server error', error }),
        };
    }
};
