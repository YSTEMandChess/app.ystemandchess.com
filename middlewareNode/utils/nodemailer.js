const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("config");

const clientId = config.get("clientId");
const clientSecret = config.get("clientSecret");
const redirectUri = config.get("redirectUri");
const refreshToken = config.get("refreshToken");
const user = config.get("user");
const senderEmail = config.get("senderEmail");

const sendMail = async ({ email, subject, text, html }) => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: user,
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
    await transport.sendMail({
      from: `"YstemAndChess" <${senderEmail}>`,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  sendMail,
};
