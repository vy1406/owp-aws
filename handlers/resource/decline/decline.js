const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const { submitterEmail, reason } = JSON.parse(event.body);

    const emailParams = {
        Destination: { ToAddresses: [submitterEmail] },
        Message: {
            Body: { Text: { Data: `Your resource submission was declined. Reason: ${reason}` } },
            Subject: { Data: 'Resource Submission Declined' },
        },
        Source: process.env.NOTIFICATION_EMAIL,
    };

    await ses.sendEmail(emailParams).promise();
    return { statusCode: 200, body: JSON.stringify({ status: 'Decline notification sent successfully.' }) };
};
