/**
 * Email sending via nodemailer.
 * Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env to enable.
 * Without these, verification links are only returned in the API response.
 */
import nodemailer from 'nodemailer'

let transporter = null
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

export function isEmailConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

export async function sendVerificationEmail(to, fullName, verifyUrl) {
  if (!isEmailConfigured() || !transporter) return { sent: false }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: 'Verify your SkillsBridge email',
    html: `
      <p>Hi ${fullName},</p>
      <p>Thanks for signing up for SkillsBridge. Click the link below to verify your email:</p>
      <p><a href="${verifyUrl}" style="color:#6d28d9">Verify my email</a></p>
      <p>Or copy this URL: ${verifyUrl}</p>
      <p>This link expires in 24 hours.</p>
      <p>— SkillsBridge</p>
    `,
    text: `Hi ${fullName}, verify your email: ${verifyUrl} (expires in 24h)`,
  })
  return { sent: true }
}
