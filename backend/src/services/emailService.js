import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Emprenddly" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Código de verificación",
      text: `Tu código de verificación es: ${code}`,
      html: `
        <h2>Verificación de tu cuenta</h2>
        <p>Tu código de verificación es:</p>
        <h1 style="background:#eee;padding:10px;width:120px;text-align:center">
          ${code}
        </h1>
        <p>Este código expira en 10 minutos.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("Error enviando correo:", err);
    return { success: false, error: err };
  }
};
