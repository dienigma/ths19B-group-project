const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const keys = require('../config/keys')
// SendGrid api key 
const options = {
    auth: {
        api_key: keys.SENDGRID_API_KEY
    }
}

const transporter = nodemailer.createTransport(sendGridTransport(options));



module.exports = transporter;