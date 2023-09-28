const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host:process.env.MAIL_HOST ,
    port: 465,
    secure: true,
    auth: {
      user:process.env.MAIL_USER ,
      pass: process.env.MAIL_PASSWORD
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

//sendWelcomeEmail
exports.sendWelcomeEmail = async (email,username) => {
    try {
        

        await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: email,
          subject: 'Voila🥳 You are now a step closer to being a Genius🤝!',
          html: `
          <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inclusive+Sans:ital@0;1&display=swap" rel="stylesheet">
    <style>
        /* Global styles */
        body {
            font-family: 'Inclusive Sans', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #F6F6F6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #FFFFFF;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
        }
        .logo {
            color: #FFA500;
            font-size: 2em;
        }
        .content {
            margin-top: 20px;
            text-align: justify;
        }
        .cta-button {
            display: block;
            margin-top: 30px;
            text-align: center;
        }
        .cta-link {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 5px;
        }
        /* Footer */
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
            <a href="https://imgbb.com/"><img src="https://i.ibb.co/YtYfYfD/image-removebg-preview.png" alt="image-removebg-preview" border="0"></a>                BoltMaths
            </div>
            <h1>Welcome to the Ultimate Math Quiz Challenge!</h1>
        </div>
        <div class="content">
            <p>Hello ${username} ,Get ready to embark on an exciting journey of math challenges and fun. BoltMaths is here to sharpen your math skills while having a blast!</p>
            <p>Here's what you can expect:</p>
            <ul>
                <li>Answer math questions in a limited time to test your skills.</li>
                <li>Beat the clock to earn extra time and become a true math genius.</li>
                <li>Collect stars and unlock new levels as you progress.</li>
            </ul>
            <p>Are you ready to become a math champion? Click the button below to start your adventure!</p>
            <div class="cta-button">
                <a class="cta-link" href="#">Get Started</a>
            </div>
        </div>
        <div class="footer">
            <p>Thank you for choosing BoltMaths - Where Math Meets Fun!</p>
        </div>
    </div>
</body>
</html>

          `,
        });
          return("Welcome mail sent sucessfully")

      } catch (error) {
        throw new Error(`Error sending welcome email: ${error}`);
      }
  
};