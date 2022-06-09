const express = require('express');
const router = express.Router(); // metodo que facilita el trabajo con las rutas
const email = require('../utility/email');

router.get('/', (req, res, next) => {
    res.json({ message: 'yor server is ready to use' });
    // res.status(404).json({ message: 'Not found!!' });
});

router.post('/contact-me-mail', (req, res, next) => {
    const userContact = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        messagge: req.body.messagge
    }

    console.log(userContact);

    const mail = new email.Email();

    const mailMessagge = `
                    <div>
                    <h1>Contact Me</h1>
                    <p><span style="font-style: italic; text-decoration: underline">from:</span> ${userContact.email}</p>
                    <p><span style="font-style: italic; text-decoration: underline">mess:</span> ${userContact.messagge}</p>
                    </div>`;


    const mailConfirmation = `<div style="width: 100vw;height: 100vh;background-color: burlywood; padding: 20px;">
                    <img src="https://eip-my-summary.web.app/assets/images/LogoEIP.png" alt="EIP Studios"
                    style="width: 200px; position: relative; left: -45px">
                    <h1 style="font-family: system-ui;font-size: 36px;">Thanks for your message🤗</h1>
                    <p style="font-size: 22px;margin: 6px;">We will respond as soon as possible</p>
                    <p style="font-size: 14px;margin-top: 28px;margin-left: 10px;">If you want to send another message click <a href="https://eip-my-summary.web.app/">here</a></p></p>
                    </div>`;

    mail.sedEmail("yosniel.ch@gmail.com", userContact.subject, mailMessagge).then(msg => {
        if (msg) {
            mail.sedEmail(userContact.email, 'EIP Mail Confirmation', mailConfirmation).then(msg => {
                if (msg) {
                    res.json({ messagge: 'Everything OK', status: true });
                }
                else {
                    res.json({ messagge: 'Fail to send Mail', status: false });

                }
            })
        } else {
            res.json({ messagge: 'Fail to send Mail', status: false });
        }
    });
});




module.exports = router;
