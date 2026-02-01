
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const sendEthereal = async (req, res) => {
	let testAcount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		auth: {
			user: 'junius.vonrueden@ethereal.email',
			pass: 'fW8SAprw2RBb48GSYF'
		}
	});

	const info = await transporter.sendMail({
		from: '"Chi somo" <jamescd007@gmail.com>',
		to: "jamesclaredunbavand@gmail.com",
		subject: "Hello",
		html: '<h1>Testing mail</h1>',
	})
	res.status(200).json({ info: info })
}

const send = async (req, res) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: 'jamescd007@gmail.com',
		from: 'jamesclaredunbavand@gmail.com',
		subject: 'Test Send with sendGrid',
		html: '<h1>Hello from other james</h1>',
	}
	const info = await sgMail.send(msg);
	console.log(info);
	res.status(200).json({ info: info });


}


module.exports = send
