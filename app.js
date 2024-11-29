const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { consumers } = require('nodemailer/lib/xoauth2');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);

})

app.post("/", (req, res)=>{
    const msg = req.body.message;
    const name = req.body.nameofperson;
    const email = req.body.username;
    const conNum = req.body.contactNum;
 const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: "rahulcshaji007@gmail.com",
            pass: "uiuoapyprkpcdjkj",
          },
 }) 

 //Email to Yourself

 const mailToSelf = {
    from : 'rahulcshaji007@gmail.com',
    to : 'rahulcshaji007@gmail.com',
    subject: `Feedback received from ${name}`,
    text: `A new feedback message has been received:\n\n
            Message:${msg}\n
            Name: ${name}
            Email Id: ${email}
            Contact Number :${conNum}`,
 };

 //Email to user
 
 const mailToUser = {
    from : 'rahulcshaji007@gmail.com',
    to : req.body.username,
    subject:`Thanks for your feedback, ${name}`,
    text: `Hi ${name}, \n\n Thank you for your valuable feedback!\n\n We appreciate your message:"${msg}"\n\n Best regards, \nTeam `,
 }

 //sent email to yourself
 transporter.sendMail(mailToSelf, (error, info)=>{
    if(error){
        console.log(`Error sending email to  self: ${error}`);
    }else{
        
        console.log(`Feedback email sent to self: ${info.response}`)
    }

 });

 //sent email to the user
 transporter.sendMail(mailToUser,(error,info)=>{
    if(error){
        console.log('Error sending email to user')
    }else{
        console.log(`Thank you email sent to user:${info.response}`);
        res.redirect('/');//redirect to home page without reloading
    }
 });
    
   
});











app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})