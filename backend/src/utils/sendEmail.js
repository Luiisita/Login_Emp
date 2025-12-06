import nodemailer from "nodemailer";

export const sendVerificationEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lualgual33@gmail.com", 
      pass: "bsumcbsxyynujepk" 
    },
  });

  await transporter.sendMail({
    from: '"Emprenddly" <lualgual33@gmail.com>',
    to: to,
    subject: "Código de verificación",
    text: `Tu código de verificación es: ${code}`,
    html: `<h3>Tu código de verificación es:</h3><h1>${code}</h1>`
  });
};
