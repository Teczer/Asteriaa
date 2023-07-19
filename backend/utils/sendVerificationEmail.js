import nodemailer from "nodemailer";

const sendVerificationEmail = async (userEmail, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Remplacez par le service de messagerie que vous souhaitez utiliser
    auth: {
      user: "asteria.noreply@gmail.com", // Remplacez par votre adresse e-mail d'expéditeur
      pass: "asteriamail", // Remplacez par le mot de passe de votre adresse e-mail
    },
  });

  const mailOptions = {
    from: "asteria.noreply@gmail.com", // Remplacez par votre adresse e-mail d'expéditeur
    to: userEmail,
    subject: "Vérification de votre adresse e-mail",
    text: `Cliquez sur le lien suivant pour vérifier votre adresse e-mail : http://votre_site.com/verify?token=${verificationToken}`,
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
