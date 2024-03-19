const nodemailer = require('nodemailer');
const configObject = require('../../config/configObjetc');

const transport = nodemailer.createTransport({
    service: configObject.mailerDir,
    port: 587,
    auth: {
        user: configObject.mailerDir,
        pass: configObject.mailerPass,
    },
});
exports.sendMail = async ({ destination, subject, html, attachments }) => {
    const mailObject = {
        from: configObject.mailerDir,
        to: destination,
        subject: subject,
        html: html,
    };
    console.log("check  attachments in send mail helper", attachments);
    if (attachments && attachments.length > 0) {
        mailObject.attachments = []
        for (const element of attachments) {
            mailObject.attachments.push ({
                filename: element.filename,
                path: __dirname + element.path,
                cid: element.cid,
            })
        }
    }

    return await transport.sendMail(mailObject);
};
