import CardQuizz from "./cardsQuizz/CardQuizz";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/UserService";

// Système Solaire
import imageSS1 from "../../assets/quizzData/collec1-cardFrontImage-1-soleil_bb36ak.webp";
import imageSS2 from "../../assets/quizzData/collec1-cardFrontImage-2-comet_wnzq4h.webp";
import imageSS3 from "../../assets/quizzData/collec1-cardBackImage-3-neptune_naijmj.webp";
import imageSS4 from "../../assets/quizzData/collec1-cardFrontImage-5-saturn_ncxgiv.webp";

// Galaxies
import imageGalaxies1 from "../../assets/quizzData/collec2-cardFrontImage-6-voielactee_emeafm.webp";
import imageGalaxies2 from "../../assets/quizzData/collec2-cardFrontImage-7-whirlpool_xmk2zn.webp";
import imageGalaxies3 from "../../assets/quizzData/collec2-cardFrontImage-8-andromede_gmy2sv.webp";
import imageGalaxies4 from "../../assets/quizzData/collec2-cardFrontImage-9-magellan_fawb7z.webp";

// Phénomènes Observables
import imagePhenomenes1 from "../../assets/quizzData/collec3-cardBackImage-11-eclipse_hqzlbx.webp";
import imagePhenomenes2 from "../../assets/quizzData/collec3-cardBackImage-13-etoile_jfmy1t.webp";
import imagePhenomenes3 from "../../assets/quizzData/collec3-cardBackImage-14-zod-light_txkudi.webp";
import imagePhenomenes4 from "../../assets/quizzData/collec3-cardBackImage-13-etoile_jfmy1t.webp";

// Astronautes
import imageAstronautes1 from "../../assets/quizzData/collec4-cardFrontImage-18-leonov_xri8tn.webp";
import imageAstronautes2 from "../../assets/quizzData/collec4-cardFrontImage-17-armstrong_zrq05u.webp";
import imageAstronautes3 from "../../assets/quizzData/collec4-cardBackImage-17-armstrong_stxghf.webp";
import imageAstronautes4 from "../../assets/quizzData/collec4-cardBackImage-20-terechkova_nuti1l.webp";

import "./main.scss";

function Main() {
  const { user, updateUserContext } = useAuthContext();
  const navigate = useNavigate();
  const [userProgression, setUserProgression] = useState([]);

  async function getUserProgression() {
    if (!user) return;

    try {
      const userResponse = await getUser(user._id);
      setUserProgression(userResponse);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur : ",
        error
      );
    }
  }

  useEffect(() => {
    document.title = "Quizz | Asteria";

    async function fetchData() {
      await getUserProgression();
    }

    fetchData();
  }, [user]);

  // TUTORIAL REDIRECTION PHASE

  useEffect(() => {
    if (user) {
      if (user.isEmailVerified === false) {
        navigate("/verify?type=verifying");
      }
      return;
    }
    // SI Y A PAS DE USER

    const completedTutorial = localStorage.getItem("completedTutorial");
    console.log("completedTutorialNAVIGATE", completedTutorial);

    if (!completedTutorial) {
      navigate("/tutorial");
    }
  }, [navigate, user, userProgression]);

  // IF USER IS NOT CONNECTED
  const progressionSystemeSolaireLocal = localStorage.getItem(
    "quizzSystemeSolaire"
  );
  const progressionGalaxiesLocal = localStorage.getItem("quizzGalaxies");
  const progressionPhenomenesObservablesLocal = localStorage.getItem(
    "quizzPhenomenesObservables"
  );
  const progressionAstronautesLocal = localStorage.getItem("quizzAstronautes");

  const quizzData = [
    {
      label: "Système Solaire",
      level: user
        ? userProgression.quizzSystemeSolaire || 1
        : progressionSystemeSolaireLocal,
      img: [imageSS1, imageSS2, imageSS3, imageSS4],
      to: "quizzSystemeSolaire",
    },
    {
      label: "Galaxies",
      level: user ? userProgression.quizzGalaxies : progressionGalaxiesLocal,
      img: [imageGalaxies1, imageGalaxies2, imageGalaxies3, imageGalaxies4],
      to: "quizzGalaxies",
    },
    {
      label: "Phénomènes Observables",
      level: user
        ? userProgression.quizzPhenomenesObservables
        : progressionPhenomenesObservablesLocal,
      img: [
        imagePhenomenes1,
        imagePhenomenes2,
        imagePhenomenes3,
        imagePhenomenes4,
      ],
      to: "quizzPhenomenesObservables",
    },
    {
      label: "Astronautes",
      level: user
        ? userProgression.quizzAstronautes
        : progressionAstronautesLocal,
      img: [
        imageAstronautes1,
        imageAstronautes2,
        imageAstronautes3,
        imageAstronautes4,
      ],
      to: "quizzAstronautes",
    },
  ];

  useEffect(() => {
    // Mettre à jour les données de l'utilisateur lorsque userProgression est mis à jour
    if (userProgression.length > 0) {
      updateUserContext(userProgression);
    }
  }, [userProgression]);

  return (
    <>
      <main className="main-content">
        <h1>Quizz Espace</h1>
        <ul className="cards-container">
          {quizzData &&
            quizzData.map((value, index) => (
              <li className="card-container" key={index}>
                <h2 className="category-name">{value.label}</h2>
                <span className="category-level-progression">
                  {value.level >= 5
                    ? "Niveau fini"
                    : `Niveau ${value.level} / 5`}
                </span>
                <Link
                  className="card-quizz-link"
                  to={
                    value.level >= 5
                      ? "/"
                      : `/quizzcontroller/${value.to}/${value.level}`
                  }
                >
                  <CardQuizz
                    src={
                      value.level >= 5
                        ? "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677915/images-quizz/PhenomenesObservable/nebuleuse4_3x_hhw3yd.jpg"
                        : value.img[value.level - 1]
                    }
                    label={value.label}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}

export default Main;
