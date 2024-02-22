const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: "",
        pass: ""
    },
    tls: {
        rejectUnauthorized: false
    }
});

// const configEmail = {
//     from: "",
//     to: "",
//     subject: "test",
//     html: "<p>teste</p>"
// }

const configEmail = (userEmail) => {
    return {
        from: process.env.EMAIL_USER,
        to: userEmail
    }
}

exports.enviarEmail = async (userEmail) => {
    const emailEnviado = await transportador.sendMail(configEmail(userEmail))
}




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