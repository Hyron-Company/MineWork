import nodemailer from 'nodemailer'

export default class MailService {
  static transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  static async sendActivationMail (to: string, link: string) : Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: 'Активация акаунта на MineWork',
      text: '',
      html: `
              <div>
                  <h1>Для активации перейдите по ссылке</h1>
                  <a href="${link}">Сюда</a>
              </div>
          `
    })
  }

  constructor() {return }
}
