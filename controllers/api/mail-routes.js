const router = require('express').Router();
const nodemailer = require('nodemailer');



// THESE ARE THE '/api/mail' ROUTES:

router.post('/new',(req,res)=>{


    const output = `
        <p>${req.body.username} has entered a new absence requests for ${req.body.start_date} - ${req.body.end_date}. Please log in to https://absence-reporting.herokuapp.com/ to approve or deny the absence.</p>
    `;
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'deanna.madon@outlook.com', // generated ethereal user
            pass: 'ncc-1701-D!', // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
});
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Group 6" <deanna.madon@outlook.com>', // sender address
        to: `${req.body.approver_email}`, // list of receivers
        subject: `New Absence Request for ${req.body.username}`, // Subject line
        text: "Hello", // plain text body
        html: output, // html body
        });
    
        console.log("Message sent: %s", info.messageId);  
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log(req.body.username);
       
    }
    
    main().catch(console.error);
});

module.exports = router;