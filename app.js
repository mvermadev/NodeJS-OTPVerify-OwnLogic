const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}))

const ran = Math.floor(Math.random() * 100000) + 1;

app.post('/sendMail', (req, res)=>{

    const name = req.body.name;
    const email = req.body.email;
    
    // console.log(ran);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'manishverma001997@gmail.com',
            pass: 'm-o-n-u1997ge'
        }
    });
    
    const mailOptions ={
        from : 'manishverma001997@gmail.com',
        to: email,
        subject: 'OTP',
        text: 'Your OTP Verification is : ' + ran + ' for ' + name + ' registration process.'
    }
    
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('EMail is sended ');
            res.end();
        } 
    })
    res.redirect('/next.html')
    res.end();
})

app.post('/sendOTP', (req, res)=>{
    const otp = req.body.otp;

    if(otp == ran){
        console.log('Succedd OTP')
        res.redirect('/succed.html');
    }
    else{
    console.log('Invalid OTP');
    res.redirect('/invalid.html')
    }
    res.end();
})

app.get('/', (req, res)=>{
    // const ran = Math.floor(Math.random() * 100000) + 1;
    // console.log(ran);
    console.log('responding to root route');
    res.send('Your NodeJS is Connnected ');
})

app.listen(1111, ()=>{
    console.log('server is running on port 1111');
})