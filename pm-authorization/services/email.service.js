import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "anhdepzaainhat@gmail.com",
    pass: "0983345368",
  }
});


const sendVerificationEmail = (email, username) => {
  const secret = process.env.PM_EMAIL_SECRET;
  const token = jwt.sign({ email, username }, secret, { expiresIn: '1h' });
  const url = `http://localhost:3000/verify/${token}`;

  const mailOptions = {
    from: process.env.PM_EMAIL,
    to: email,
    subject: 'Please verify your email',
    html: `
      <h1>Please verify your email</h1>
      <p>Click the link below to verify your email</p>
      <a href="${url}">${url}</a>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const EmailService = {
  sendVerificationEmail
}
export default EmailService