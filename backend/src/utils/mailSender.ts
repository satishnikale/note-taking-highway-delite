
const nodemailer = require("nodemailer");
// const MailerSend = require("@mailersend/mailersend");
require("dotenv").config();

 
const mailSender =async ({email,title,body}:any)=>{
    try {
     
        console.log("MAIL_USER:", process.env.MAIL_USER);
        console.log("MAIL_PASS:", process.env.MAIL_PASS);
        
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST, 
            //port: 465, // or 587 if you prefer STARTTLS
            //secure: true, // true for port 465, false for 587
            port: 587,
            secure: false, // STARTTLS
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },  
        })

        let Info = await transporter.sendMail({
            from: "Highway-Delite - by Satish Nikale ",
            to: `${email}`,            // mailsender function madhun ::-->  email,title, and body ghetleli ahe 
            subject:`${title}`,                  // chcek can we use --> {body } or not
            html:`${body}`
        }) 

        console.log("Mail is send Succesfully --> ");

    }catch (error) {
        console.log(error);
        
    }
}