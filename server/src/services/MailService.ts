import nodemailer, { TransportOptions } from 'nodemailer'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CLIENT_URL } = process.env

export class MailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST as string,
      port: SMTP_PORT as string,
      secure: false,
      auth: {
        user: SMTP_USER as string,
        pass: SMTP_PASSWORD as string
      }
    } as TransportOptions)
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