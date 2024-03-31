import nodemailer from "nodemailer";
import { MAIL_PASSWORD, MAIL_USER, SMTP_HOST, SMTP_PORT } from ".";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Next Authentication 😊❤🚀👻" <qurashishebi@gmail.com>', // sender address
      to, // list of receivers
      subject,
      text,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error while sending mail");
    console.log(error);
  }
};

export default sendMail;
