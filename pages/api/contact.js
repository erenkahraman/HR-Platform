import nodemailer from "nodemailer";
import cookie from "js-cookie";


export default async (req, res) => {
  const {emailFrom, emailTo, subject, message } = req.body;

 
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
 
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD
    }
  });

  
// verify connection configuration

try {
  await transporter.sendMail({
    from:  process.env.GOOGLE_USER, //emailFrom
    to: emailTo,
    subject: subject,
    html: `<p>${message}</p>`
  });
} catch (error) {
  return res.status(500).json({ error: error.message || error.toString() });
}
return res.status(200).json({ error: "" });
};