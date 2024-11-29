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
 const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: "rahulcshaji007@gmail.com",
            pass: "uiuoapyprkpcdjkj",
          },
 }) 

 const mailOption = {
    from : 'rahulcshaji007@gmail.com',
    to : req.body.username,
    cc :'rahulcshaji007@gmail.com',
    subject: `Thanks for giving feedback ${name}`,
    text: `Thanks for your message you have sent to us ${msg}`
 }

 transporter.sendMail(mailOption, (error, info)=>{
    if(error){
        console.log(error);
    }else{
        res.redirect('/');
        console.log(`email sent ${info.response}`)
    }

 })
    
   
});











app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})