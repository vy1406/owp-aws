const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
}

exports.handler = async (event) => {
    try {
        const { dateFrom, dateTo, submission_city, status, additional_info } = event.queryStringParameters || {};

        let filterExpression = [];
        let expressionAttributeValues = {};
        let expressionAttributeNames = {};

        if (dateFrom && dateTo) {
            filterExpression.push("application_date BETWEEN :dateFrom AND :dateTo");
            expressionAttributeValues[":dateFrom"] = dateFrom;
            expressionAttributeValues[":dateTo"] = dateTo;
        }

        if (submission_city) {
            filterExpression.push("submission_city = :submission_city");
            expressionAttributeValues[":submission_city"] = submission_city;
        }

        if (status) {
            filterExpression.push("#st = :status");
            expressionAttributeValues[":status"] = status;
            expressionAttributeNames["#st"] = "status"; // Needed for reserved word "status"
        }

        if (additional_info) {
            filterExpression.push("contains(additional_info, :additional_info)");
            expressionAttributeValues[":additional_info"] = additional_info;
        }

        const params = {
            TableName: process.env.APPLICATIONS_TABLE,
            ...(filterExpression.length > 0 && { FilterExpression: filterExpression.join(" AND ") }),
            ...(Object.keys(expressionAttributeValues).length > 0 && { ExpressionAttributeValues: expressionAttributeValues }),
            ...(Object.keys(expressionAttributeNames).length > 0 && { ExpressionAttributeNames: expressionAttributeNames })
        };

        const result = await dynamoDB.scan(params).promise();

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify(result.Items),
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ message: error.message })
        };
    }
};
