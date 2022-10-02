import nodemailer from 'nodemailer'

class Mail {
  private toVal: string = ''
  private subjectVal: string = ''
  private bodyVal: string = ''

  to(to: string): Mail {
    this.toVal = to
    return this
  }

  subject(subject: string): Mail {
    this.subjectVal = subject
    return this
  }

  body(body: string): Mail {
    this.bodyVal = body
    return this
  }

  async send() {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`, // sender address
      to: this.toVal, // list of receivers
      subject: this.subjectVal, // subject line
      html: this.bodyVal, // body
    })
  }
}

export default Mail
