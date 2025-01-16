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

    try {
        jwt.verify(token, SECRET);

        const { dateFrom, dateTo, submission_city, status, additional_info } = event.queryStringParameters || {};

        let filterExpression = [];
        let expressionAttributeValues = {};
        let expressionAttributeNames = {};

        if (dateFrom && dateTo) {
            filterExpression.push("application_date BETWEEN :dateFrom AND :dateTo");
            expressionAttributeValues[":dateFrom"] = dateFrom;
            expressionAttributeValues[":dateTo"] = dateTo;
        } else if (dateFrom) {
            filterExpression.push("application_date >= :dateFrom");
            expressionAttributeValues[":dateFrom"] = dateFrom;
        } else if (dateTo) {
            filterExpression.push("application_date <= :dateTo");
            expressionAttributeValues[":dateTo"] = dateTo;
        }


        if (submission_city) {
            filterExpression.push("submission_city = :submission_city");
            expressionAttributeValues[":submission_city"] = submission_city;
        }

        if (status) {
            filterExpression.push("#st = :status");
            expressionAttributeValues[":status"] = status;
            expressionAttributeNames["#st"] = "status";
        }

        if (additional_info) {
            filterExpression.push("contains(additional_info, :additional_info)");
            expressionAttributeValues[":additional_info"] = additional_info;
        }

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            FilterExpression: filterExpression.length > 0 ? filterExpression.join(" AND ") : undefined,
            ExpressionAttributeValues: Object.keys(expressionAttributeValues).length > 0 ? expressionAttributeValues : undefined,
            ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined, // Only include if there are reserved words
        };

        const result = await dynamoDB.scan(params).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: error.message })
        };
    }
};
