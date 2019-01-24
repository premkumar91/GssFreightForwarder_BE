var nodemailer = require('nodemailer');
const express = require('express')
const app = express()
const port = 5002;
var bodyParser = require('body-parser')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gssfreightforwarders.contact@gmail.com',
    pass: 'Nokia1100@@'
  }
});


var mailOptions = {
  from: 'gssfreightforwarders.contact@gmail.com',
  to: 'gssfreightforwarders.contact@gmail.com', //company original mail address  will come here
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

function init() {
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(setDefaultResponseHeader)
  app.post('/', sendMail)
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

function setDefaultResponseHeader(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
}

function sendMail(request, response) {
  mailOptions.subject = request.body.contact.name + "-" + request.body.contact.mail + "-" + request.body.contact.contactNumber;
  mailOptions.text = request.body.contact.message;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      response.json({
        status: "failed"
      });
    } else {
      response.json(request.body)
    }
  });
}
init()