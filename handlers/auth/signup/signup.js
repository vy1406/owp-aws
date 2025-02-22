const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";
const TABLE_NAME = process.env.TABLE_NAME || "UsersTable";

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
}

exports.handler = async (event) => {
    try {
        const { username, password } = JSON.parse(event.body);

        if (!username || !password) {
            return {
                statusCode: 400,
                headers: HEADERS,
                body: JSON.stringify({ message: 'Wrong username or password' }),
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const duplicatedUser = await dynamoDB.get({ TableName: TABLE_NAME, Key: { username } }).promise();

        if (duplicatedUser.Item) {
            return {
                statusCode: 400,
                headers: HEADERS,
                body: JSON.stringify({ message: 'User already exist' }),
            };
        }

        const params = { TableName: TABLE_NAME, Item: { username, password: hashedPassword }, };
        await dynamoDB.put(params).promise();
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ message: 'User created successfully', token, username }),
        };

    } catch (error) {
        console.error('Error in signup handler:', error);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ message: 'Wrong username or password', error }),
        };
    }
};
