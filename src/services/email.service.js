const nodemailer = require("nodemailer");
const env = require("../config/env.js");

const transporter = nodemailer.createTransport({
    host : env.smtpHost,
    port : env.smtpPort,
    auth : {
        user : env.smtpUser,
        pass : env.smtpPass
    }
});

const sendEmail = async({to , subject , text , html}) =>{
    await transporter.sendMail({
        from : env.emailFrom,
        to,
        subject,
        text,
        html
    })
}

module.exports = {
    sendEmail
}