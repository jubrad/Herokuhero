var nodemailer = require("nodemailer");
var email= {};
	emailInfo.address= 'herokuhero@gmail.com';
	emailInfo.password='sib4life';
	emailInfo.subject='your site is down';
	emailInfo.message='Heroku Hero has noticed that your site may be down';



var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: email.address,
        pass: email.password
    }
});

module.exports = email;
