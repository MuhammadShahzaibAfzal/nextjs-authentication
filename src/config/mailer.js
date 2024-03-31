import nodemailer from "nodemailer";
import { DOMAIN, MAIL_PASSWORD, MAIL_USER, SMTP_HOST, SMTP_PORT } from ".";
import User from "@/models/user-model";
import { v4 as uuidv4 } from "uuid";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async ({ emailType, userID }) => {
  let to, subject, text;

  if (emailType === "VERIFY") {
    const verifyToken = uuidv4();
    const verifyTokenExpiry = Date.now() + 300000; // 5 minutes
    const user = await User.findByIdAndUpdate(userID, {
      verifyToken,
      verifyTokenExpiry,
    });
    to = user.email;
    subject = " 🚀😊Account Verification Required";
    text = getEmailBodyText("VERIFY", {
      firstName: user.firstName,
      link: `${DOMAIN}/users/verify/${verifyToken}`,
    });
  } else {
    // FORGET PASSWORD EMAIL
  }
  try {
    const info = await transporter.sendMail({
      from: '"Next Authentication 😊❤🚀👻" <qurashishebi@gmail.com>', // sender address
      to,
      subject,
      text,
    });
  } catch (error) {
    console.log("Error while sending mail");
    console.log(error);
  }
};

export default sendMail;

export const getEmailBodyText = (emailType, data) => {
  let message;
  if (emailType === "VERIFY") {
    message = `
    Dear ${data.firstName} 🚀😊,
    
    Thank you for registering with Shahzaib Next Auth Project! To complete your registration and verify your email address, please click the link below:
    
    ${data.link}
        
    If you did not request this registration, please ignore this email. Your account will not be activated until you verify your email address.
    
    Thank you,
    Shahzaib Afzal 🚀😊
    `;
  } else if (emailType === "FORGET_PASSWORD") {
  } else {
  }

  return message;
};
