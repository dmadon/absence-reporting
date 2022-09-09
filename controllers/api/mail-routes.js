const router = require('express').Router();
const nodemailer = require('nodemailer');



// THESE ARE THE '/api/mail' ROUTES:

// NEW ABSENCE EMAIL TO APPROVER:
router.post('/new',(req,res)=>{

    const output = `
        <p>${req.body.username} has entered a new absence request for ${req.body.start_date} - ${req.body.end_date}. Please log in to https://absence-reporting.herokuapp.com/ to approve or deny the absence.</p>
    `;

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
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


// UPDATED ABSENCE EMAIL TO APPROVER:
router.post('/update',(req,res)=>{

console.log(req.body)

    const output = `
        <p>${req.body.username} has updated an absence request. Please see the details below:

            <strong>Orignal Absence Details:<strong>
            Start Date: ${req.body.orig_start_date}
            End Date: ${req.body.orig_end_date}
            Leave Type: ${req.body.orig_leave_type}
            Absence Hours: ${req.body.orig_absence_hours}

            <strong>New Absence Details:<strong>
            Start Date: ${req.body.start_date}
            End Date: ${req.body.end_date}
            Leave Type: ${req.body.leave_type}
            Absence Hours: ${req.body.absence_hours}

        
        Please log in to https://absence-reporting.herokuapp.com/ to approve or deny these changes.</p>
    `;

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
});
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Group 6" <deanna.madon@outlook.com>', // sender address
        to: `${req.body.approver_email}`, // list of receivers
        subject: `Updated Absence Request for ${req.body.username}`, // Subject line
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