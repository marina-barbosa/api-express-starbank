const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

module.exports = transportador;


const mensagemHTML = `
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #222;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        h1 {
            color: #ffffff;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1> bla bla bla! </h1>    
</body>
</html>
`;