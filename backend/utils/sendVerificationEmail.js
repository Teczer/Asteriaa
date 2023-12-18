import nodemailer from "nodemailer";
const sendVerificationEmail = async (
  userEmail,
  verificationToken,
  username
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Remplacez par le service de messagerie que vous souhaitez utiliser
    auth: {
      user: "asteria.noreply@gmail.com", // Remplacez par votre adresse e-mail d'expéditeur
      pass: "pbjshcxceavqxgzu", // Remplacez par le mot de passe de votre adresse e-mail
    },
  });

  const mailOptions = {
    from: "asteria.noreply@gmail.com", // Remplacez par votre adresse e-mail d'expéditeur
    to: userEmail,
    subject: "Vérification de votre adresse e-mail",
    html: `<head>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <style type="text/css">
      body {
        font-family: "Montserrat", sans-serif !important; 
        background: #f9f9f9 !important;
      }
  
      .container {
        max-width: 640px !important;
        margin: 0 auto !important;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1) !important;
        border-radius: 4px !important;
        overflow: hidden !important;
      }
  
      .header {
        background: #0a1e3eff !important;
        padding: 57px !important;
        text-align: center !important;
        color: white !important;
        font-family: "Whitney", "Helvetica Neue", Helvetica, Arial,
          "Lucida Grande", sans-serif !important;
        font-size: 36px !important;
        font-weight: 600 !important;
        line-height: 36px !important;
      }
  
      .content {
        background: #ffffff !important;
        padding: 40px 70px !important;
        text-align: center !important;
      }
  
      .content img {
        height: 200px !important;
      }
  
      .content-text {
        color: #737f8d;
        font-family: "Whitney", "Helvetica Neue", Helvetica, Arial,
          "Lucida Grande", sans-serif !important;
        font-size: 16px !important;
        line-height: 24px !important;
        text-align: left !important;
      }
  
      .content-text h2 {
        font-weight: 500 !important;
        font-size: 20px !important;
        color: #4f545c !important;
        letter-spacing: 0.27px !important;
      }
  
      .button-container {
        padding: 10px 25px !important;
      }
  
      .button {
        border: none;
        border-radius: 3px;
        color: white;
        cursor: pointer;
        padding: 15px 19px;
        background-color: #0a1e3e;
      }
  
      .button-link {
        color: white !important;
        text-decoration: none !important;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Bienvenue sur Asteria !</div>
      <div class="content">
        <h2>Hey ${username},</h2>
        <p class="content-text">
          Merci de t'être inscrit(e) sur Asteria la plateforme spatiale ultime.
          <br />
          Tu es la personne la plus géniale de toute la galaxie (et j'ai rencontré
          beaucoup de personnes vraiment géniales).
        </p>
        <p class="content-text">
          Avant de commencer, nous devrons vérifier ton adresse e-mail.
        </p>
        <div class="button-container">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            style="border-collapse: separate"
            align="center"
            border="0"
          >
            <tbody>
              <tr>
                <td
                  class="button"
                  align="center"
                  valign="middle"
                  bgcolor="#0a1e3e"
                >
                  <a
                    href="https://asteriaspace.fr/verify?token=${verificationToken}"
                    class="button-link"
                    target="_blank"
                  >
                    Vérifier l'email
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de vérification envoyé !");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'e-mail de vérification : ",
      error
    );
  }
};

export default sendVerificationEmail;
