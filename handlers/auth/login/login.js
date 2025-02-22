const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

exports.handler = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);

        if (!username || !password) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                },
                body: JSON.stringify({ message: 'Missing username or password' }),
            };
        }

        const params = {
            TableName: 'UsersTable',
            Key: { username },
        };

        const result = await dynamoDB.get(params).promise();
        const user = result.Item;

        if (!user) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                },
                body: JSON.stringify({ message: 'Invalid username or password' }),
            };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                },
                body: JSON.stringify({ message: 'Invalid username or password' }),
            };
        }

        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            },
            body: JSON.stringify({ message: 'Login successful', token, username: user.username }),
        };
    } catch (error) {
        console.error('Error in login handler:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            },
            body: JSON.stringify({ message: 'Internal server error', error }),
        };
    }
};
