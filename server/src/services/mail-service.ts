import nodemailer from 'nodemailer'

class MailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mine.work.off@gmail.com',
        pass: 'fsdgfdgsd5548sdfsd'
      }
    })
  }

  public sendActivationMail = async (to: string, link: string) => {
    await this.transporter.sendMail({
      from: 'mine.work.off@gmail.com',
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
}

export default new MailService();