var nodemailer = require('nodemailer');
const express = require('express')
const app = express()
const port = 5002;
const bodyParser = require('body-parser')
const _ = require('lodash');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gssfreightforwarders.contact@gmail.com',
    pass: 'Nokia1100@@'
  }
});


var mailOptions = {
  from: 'gssfreightforwarders.contact@gmail.com',
  to: 'gssfreightforwarders@gmail.com', //company original mail address  will come here
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
  if(!_.has(request.body,'contact.message') || !_.has(request.body,'contact.name') || !_.has(request.body,'contact.mail') || !_.has(request.body,'contact.contactNumber')){
    return response.json({
      status:"failed",
      reason:"Either message contact.message , name , mail , phone number missing in payload"
    })
  }
  mailOptions.subject = request.body.contact.name + "-" + request.body.contact.mail + "-" + request.body.contact.contactNumber;
  mailOptions.text = request.body.contact.message;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return response.json({
        status: "failed"
      });
    } else {
      return response.json({status:'success'})
    }
  });
}
init()