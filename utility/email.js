class Email {
    constructor(host = "smtp.gmail.com,", port = 465, secure = true, user = "eipstudios.dev@gmail.com", pass = "tqynaxnddsjrwaba") {
        this.nodemailer = require("nodemailer");
        this.host = host;
        this.port = port;
        this.secure = secure;
        this.user = user;
        this.pass = pass;
        this.transporter = false
    }
    async sedEmail(recipients, subject, body) {
        // if the connection exist, I dont create it againt
        if (!this.transporter) {
            console.log('creo el trasnporter');
            this.transporter = this.nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "eipstudios.dev@gmail.com",
                    pass: "tqynaxnddsjrwaba",
                },
            });
        };

        // checking errors when establishirng connection
        try {
            await this.transporter.verify();
            console.log('ready for send Emails');
            // checking error when the email is sent
            try {
                let info = await this.transporter.sendMail({
                    from: '"Contact Me 👻" <eipstudios.dev@gmail.com>',
                    to: recipients,
                    subject: subject,
                    text: "",
                    html: body,
                });
                console.log("Message sent: %s", info.messageId);
                return true;
            } catch (error) {
                console.log('Fail to send email');
                return false;
            }
        } catch (error) {
            this.transporter = false;
            console.log('Fail to connect to server - Check connection data and credentials and try again');
            return false;
        };
    };
};

module.exports.Email = Email;