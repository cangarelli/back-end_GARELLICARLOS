const nodemailer = require ("nodemailer")

const transport = nodemailer.createTransport({
    serice: "gmail",
    port: 587,
    auth:{
        user: "poner el mail que uso desde .env",
        pass: "poner el pass configurado desde .env"
    }
})
exports.sendMail = async ({destination, subject, html}) => {
    return await transport.sendMail({
        from: "Este mail lo envia <mail de env.>",
        to: destination,
        subject: subject,
        html: html,
        attachments: [{
            filename: 'nodejs.png',
            path: __dirname + '/nodejs.png',
            cid: 'node'
        }]
    })
}