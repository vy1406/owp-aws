const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SECRET = process.env.JWT_SECRET || "mysecretkey3";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

exports.handler = async (event) => {
    const authHeader = event.headers?.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }

    const token = authHeader.split(" ")[1];
    const data = JSON.parse(event.body)
    if (data.id === undefined) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ message: 'Bad Request' })
        };
    }

    try {
        jwt.verify(token, SECRET);

        let updateExpression = 'SET';
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        if (data.additional_info !== undefined) {
            updateExpression += ' #additional_info = :additional_info,';
            expressionAttributeNames['#additional_info'] = 'additional_info';
            expressionAttributeValues[':additional_info'] = data.additional_info;
        }
        if (data.application_date !== undefined) {
            updateExpression += ' #application_date = :application_date,';
            expressionAttributeNames['#application_date'] = 'application_date';
            expressionAttributeValues[':application_date'] = data.application_date;
        }
        if (data.biometric_date !== undefined) {
            updateExpression += ' #biometric_date = :biometric_date,';
            expressionAttributeNames['#biometric_date'] = 'biometric_date';
            expressionAttributeValues[':biometric_date'] = data.biometric_date;
        }
        if (data.decision_date !== undefined) {
            updateExpression += ' #decision_date = :decision_date,';
            expressionAttributeNames['#decision_date'] = 'decision_date';
            expressionAttributeValues[':decision_date'] = data.decision_date;
        }
        if (data.is_self_submitted !== undefined) {
            updateExpression += ' #is_self_submitted = :is_self_submitted,';
            expressionAttributeNames['#is_self_submitted'] = 'is_self_submitted';
            expressionAttributeValues[':is_self_submitted'] = data.is_self_submitted;
        }
        if (data.status !== undefined) {
            updateExpression += ' #status = :status,';
            expressionAttributeNames['#status'] = 'status';
            expressionAttributeValues[':status'] = data.status;
        }
        if (data.submission_city !== undefined) {
            updateExpression += ' #submission_city = :submission_city,';
            expressionAttributeNames['#submission_city'] = 'submission_city';
            expressionAttributeValues[':submission_city'] = data.submission_city;
        }

        updateExpression = updateExpression.slice(0, -1);

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            Key: { id: data.id },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_NEW',
        };

        const result = await dynamoDB.update(params).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.Attributes)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: error.message }) };
    }
};
