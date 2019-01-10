var nodemailer = require('nodemailer');
const express = require('express')
const app = express()
const port = 3001;


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

  function init(){
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  }
  
  init()
  
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });