import nodemailer from 'nodemailer';

async function EmailSend ({
    name,
    message,
    subject
}) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

     return transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: `${name} <${process.env.ADMIN_EMAIL}>`,
        replyTo: process.env.REPLY_TO,
        subject: subject,
        text: message
    });
}

export default EmailSend;
