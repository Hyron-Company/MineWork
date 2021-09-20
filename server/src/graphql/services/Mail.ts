import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mine.work.off@gmail.com',
    pass: 'fsdgfdgsd5548sdfsd'
  }
})

export const sendActivationMail = async (to: string, link: string) => {
  transporter.sendMail({
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
