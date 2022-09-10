const router = require('express').Router();
const nodemailer = require('nodemailer');



// THESE ARE THE '/api/mail' ROUTES:

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com",
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'bootcampgroup6@gmail.com', // generated ethereal user
        pass: 'AC32Fj9SUmDb5RhK', // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
});

// NEW ABSENCE EMAIL TO APPROVER:
router.post('/new',(req,res)=>{

    const output = `
        <p>${req.body.username} has entered a new absence request. Details for the absence are listed below.

        </br>
        <ul><strong>New Absence Details:</strong>
        <li>Start Date: ${req.body.start_date}</li>
        <li>End Date: ${req.body.end_date}</li>
        <li>Leave Type: ${req.body.leave_type}</li>
        <li>Absence Hours: ${req.body.absence_hours}</li>
        </ul>

        </br>

        Please log in to https://absence-reporting.herokuapp.com/ to approve or deny the absence.</p>
    `;

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        
        
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Group 6" <bootcampgroup6@gmail.com>', // sender address
        to: `${req.body.approver_email}`, // list of receivers
        subject: `New Absence Request for ${req.body.username}`, // Subject line
        text: "Hello", // plain text body
        html: output, // html body
        });
    
        console.log("Message sent: %s", info.messageId);  
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("Email sent to "+req.body.approver_email);
       
    }
    
    main().catch(console.error);
});


// UPDATED ABSENCE EMAIL TO APPROVER:
router.post('/update',(req,res)=>{

console.log(req.body)

    const output = `
        <p>${req.body.username} has updated an absence request. Details for the absence are listed below.

        </br>
        
        <ul><strong>Orignal Absence Details:</strong>
        <li>Start Date: ${req.body.orig_start_date}</li>
        <li>End Date: ${req.body.orig_end_date}</li>
        <li>Leave Type: ${req.body.orig_leave_type}</li>
        <li>Absence Hours: ${req.body.orig_absence_hours}</li>
        </ul>

        </br>
        <ul><strong>New Absence Details:</strong>
        <li>Start Date: ${req.body.start_date}</li>
        <li>End Date: ${req.body.end_date}</li>
        <li>Leave Type: ${req.body.leave_type}</li>
        <li>Absence Hours: ${req.body.absence_hours}</li>
        </ul>

        </br>

        Please log in to https://absence-reporting.herokuapp.com/ to approve or deny these changes.</p>
    `;

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//         host: "smtp-mail.outlook.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: process.env.EMAIL_USER, // generated ethereal user
//             pass: process.env.EMAIL_PASSWORD, // generated ethereal password
//         },
//         tls:{
//             rejectUnauthorized:false
//         }
// });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Group 6" <bootcampgroup6@gmail.com>', // sender address
        to: `${req.body.approver_email}`, // list of receivers
        subject: `Updated Absence Request for ${req.body.username}`, // Subject line
        text: "Hello", // plain text body
        html: output, // html body
        });
    
        console.log("Message sent: %s", info.messageId);  
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("Email sent to "+req.body.approver_email);
       
    }
    
    main().catch(console.error);
});

module.exports = router;