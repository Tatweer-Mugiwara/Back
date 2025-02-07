import emailjs from 'emailjs-com';

async function EmailSend ({
    name,
    message,
    email,
    subject
}) {
    await emailjs.send(`${process.env.EMAIL_SERVICEID}`, `${process.env.EMAIL_CONTACTTEMPLATEID}`, {
        name,
        message,
        email,
        subject,
      },
      `${process.env.EMAIL_USERKEY}`
    );
}

export default EmailSend;
