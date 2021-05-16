const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars');
const path = require('path')
const nodemailer = require('nodemailer')

const mailer = {}

mailer.transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.MAILER_USER, 
    pass: process.env.MAILER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

mailer.transporter.use('compile', hbs({
  viewEngine: exphbs.create({
    partialsDir: 'partials/',
    defaultLayout: false
  }),
  viewPath: path.resolve(__dirname, '../views/emails'),
  extName: '.hbs'
}))

mailer.send = (email, user, subject, text) => {
  mailer.transporter.sendMail({
      from: 'Geeky', 
      to: email, 
      subject: subject,
      template: text,
      context: { user }
    })
}

module.exports = mailer