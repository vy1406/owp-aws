const AWS = require('aws-sdk');
const ses = new AWS.SES();
const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event) => {
    const { id, title, description, link, tags, submitterEmail } = JSON.parse(event.body);

    const adminEmail = process.env.ADMIN_EMAIL;

    // Start Step Function execution
    const stateMachineArn = process.env.STATE_MACHINE_ARN;
    const executionParams = {
        stateMachineArn,
        input: JSON.stringify({
            id,
            title,
            description,
            link,
            tags,
            submitterEmail,
        }),
    };

    try {
        // Trigger Step Function
        await stepFunctions.startExecution(executionParams).promise();

        // Send notification email to admin
        const approveUrl = `${process.env.API_ENDPOINT}/approve/${id}`;
        const declineUrl = `${process.env.API_ENDPOINT}/decline/${id}`;

        const emailBody = `
            <html>
                <body>
                    <p>A new resource has been submitted:</p>
                    <p><strong>Title:</strong> ${title}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Tags:</strong> ${tags.join(', ')}</p>
                    <p><strong>Source:</strong> ${submitterEmail}</p>
                    <p><strong>Link:</strong> <a href="${link}">${link}</a></p>
                    <p>Click below to approve or decline:</p>
                    <a href="${approveUrl}" style="padding: 10px; background-color: green; color: white; text-decoration: none;">Approve</a>
                    <a href="${declineUrl}" style="padding: 10px; background-color: red; color: white; text-decoration: none;">Decline</a>
                </body>
            </html>
        `;

        const emailParams = {
            Destination: { ToAddresses: [adminEmail] },
            Message: {
                Body: { Html: { Data: emailBody } },
                Subject: { Data: 'New Resource Submission' },
            },
            Source: process.env.NOTIFICATION_EMAIL,
        };

        await ses.sendEmail(emailParams).promise();

        return { statusCode: 200, body: JSON.stringify({ status: 'Notification sent and Step Function started.' }) };
    } catch (error) {
        console.error('Error starting Step Function or sending email:', error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
