const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID =
  '139010272292-49uklr8m9aekaqn5bhokd6gbn692hqk4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04ke3Qd4OSpzcCgYIARAAGAQSNwF-L9Ir0BQulZAmvSZIU2hD3bN25DmltHNhfXnjEaQmLPLoOUDiOEQ2bbVrg6yxo0rKmtjlCWI';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async (email, token) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      //create reusable transporter obj using the default SMTP transport
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'bbelagavi6@gmail.com',
        pass: '8296453892',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    });
    console.log(transport);

    const mailOptions = {
      from: 'Manjunath S Belagavi 📧 <bbelagavi6@gmail.com>',
      to: email, //'bbelagavi6@gmail.com,mdazharsanti113@gmail.com', //email,
      subject: 'Hello from gmail using API',
      text: 'Hello from Manjunath email using API',
      html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`
    };

    const result = await transport.sendMail(mailOptions);
    console.log('mailoption details', result);
    return result;
  } catch (error) {
    return error;
  }
};

export const sendMailToRegisteredUser=async(email, firstName, lastName) =>{
  try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'bbelagavi6@gmail.com',
            pass: '8296453892',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
          }
      });

      const mailOptions = {
          from: 'Manjunath S Belagavi 📧 <bbelagavi6@gmail.com>',
          to: email,
          subject: 'Registration is Successfull',
          text: `Hi, ${firstName} ${lastName} you are successfully registered....`,
      };

      const result = await transport.sendMail(mailOptions)
      return result;

  } catch (error) {
      return error;

  }
}
