const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
    const id = uuidv4();
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        },
        body: JSON.stringify({ message: 'Hello with external package!', id }),
    };
};