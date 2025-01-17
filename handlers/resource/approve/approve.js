const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES();

exports.handler = async (event) => {
    const { id, title, description, link, tags, submitterEmail } = JSON.parse(event.body);

    const params = {
        TableName: process.env.RESOURCES_TABLE,
        Item: { id, title, description, link, tags, type, submitterEmail },
    };

    await dynamoDB.put(params).promise();

    const emailParams = {
        Destination: { ToAddresses: [submitterEmail] },
        Message: {
            Body: { Text: { Data: `Your resource titled "${title}" has been approved.` } },
            Subject: { Data: 'Resource Approved' },
        },
        Source: process.env.NOTIFICATION_EMAIL,
    };

    await ses.sendEmail(emailParams).promise();
    return { statusCode: 200, body: JSON.stringify({ status: 'Resource approved and submitter notified.' }) };
};
