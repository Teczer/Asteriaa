import decode from "jsonwebtoken-esm/decode";

const getUserIdFromToken = (token) => {
  try {
    console.log("tokenFROMGET", token);
    const decodedToken = decode(token); // Utilisez la fonction 'decode' de la librairie jsonwebtoken-esm
    console.log("decodedTokentokenFROMGET", decodedToken);
    return decodedToken.userId;
  } catch (error) {
    console.error("Erreur lors du décodage du token : ", error);
    return null;
  }
};

export default getUserIdFromToken;
