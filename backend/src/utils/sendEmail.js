import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Codigo de verificacion",
    text: "Tu codigo de verificacion es: " + code,
    html: `
      <p>Tu codigo de verificacion es:</p>
      <h1>${code}</h1>
    `
  });
};
