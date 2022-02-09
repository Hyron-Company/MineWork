import dotenv from 'dotenv'
import nodemailer, { TransportOptions } from 'nodemailer'

dotenv.config()
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CLIENT_URL } = process.env

export class MailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    } as TransportOptions)
  }

  async send(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text: '',
      html
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + CLIENT_URL,
      text: '',
      html: `<h1>Для активации перейдите по <a href="${link}">ссылке</a></h1>`
    })
  }
}