import CardQuizz from "./cardsQuizz/CardQuizz";
import "./main.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function Main() {
  const { user, updateUser } = useAuthContext();

  // TUTORIAL REDIRECTION PHASE

  const navigate = useNavigate();
  const [userProgression, setUserProgression] = useState([]);

  useEffect(() => {
    console.log("userFROMNAVIGATE", user);
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

  async function getUserProgression() {
    if (!user) return;

    const response = await axios.get(
      `http://146.59.150.192:5001/user/${user._id}`
    );
    setUserProgression(response.data);
    console.log("response.data", response.data);
  }

  // IF USER IS NOT CONNECTED
  const progressionSystemeSolaireLocal = localStorage.getItem(
    "quizzSystemeSolaire"
  );
  const progressionGalaxiesLocal = localStorage.getItem("quizzGalaxies");
  const progressionPhenomenesObservablesLocal = localStorage.getItem(
    "quizzPhenomenesObservables"
  );
  const progressionAstronautesLocal = localStorage.getItem("quizzAstronautes");

  console.log("userProgression", userProgression);

  let mescouilles = [
    {
      label: "Système Solaire",
      level: user
        ? userProgression.quizzSystemeSolaire || 1
        : progressionSystemeSolaireLocal,
      img: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardFrontImage-1-soleil_bb36ak.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675181/images-collections/1-systeme%20solaire/collec1-cardFrontImage-2-comet_wnzq4h.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardBackImage-3-neptune_naijmj.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardFrontImage-5-saturn_ncxgiv.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-1-soleil_fcgefa.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677915/images-quizz/PhenomenesObservable/nebuleuse4_3x_hhw3yd.jpg",
      ],
      to: "quizzSystemeSolaire",
    },
    {
      label: "Galaxies",
      level: user ? userProgression.quizzGalaxies : progressionGalaxiesLocal,
      img: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/2-galaxies/collec2-cardFrontImage-6-voielactee_emeafm.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675171/images-collections/2-galaxies/collec2-cardFrontImage-7-whirlpool_xmk2zn.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675169/images-collections/2-galaxies/collec2-cardFrontImage-8-andromede_gmy2sv.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675170/images-collections/2-galaxies/collec2-cardFrontImage-9-magellan_fawb7z.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675171/images-collections/2-galaxies/collec2-cardFrontImage-10-horsehead_ixzx8i.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677915/images-quizz/PhenomenesObservable/nebuleuse4_3x_hhw3yd.jpg",
      ],
      to: "quizzGalaxies",
    },
    {
      label: "Phénomènes Observables",
      level: user
        ? userProgression.quizzPhenomenesObservables
        : progressionPhenomenesObservablesLocal,
      img: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677917/images-quizz/PhenomenesObservable/eclipse_w3bgwj.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardBackImage-11-eclipse_hqzlbx.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardBackImage-14-zod-light_txkudi.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardBackImage-13-etoile_jfmy1t.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675175/images-collections/3-phenomenes/collec3-cardFrontImage-12-moon_veahxq.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677915/images-quizz/PhenomenesObservable/nebuleuse4_3x_hhw3yd.jpg",
      ],
      to: "quizzPhenomenesObservables",
    },
    {
      label: "Astronautes",
      level: user
        ? userProgression.quizzAstronautes
        : progressionAstronautesLocal,
      img: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardFrontImage-18-leonov_xri8tn.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/4-astronautes/collec4-cardFrontImage-17-armstrong_zrq05u.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-17-armstrong_stxghf.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-20-terechkova_nuti1l.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675174/images-collections/4-astronautes/collec4-cardFrontImage-16-gagarine_nrk3re.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677915/images-quizz/PhenomenesObservable/nebuleuse4_3x_hhw3yd.jpg",
      ],
      to: "quizzAstronautes",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      await getUserProgression();
    }

    fetchData();
  }, [user]);

  useEffect(() => {
    // Mettre à jour les données de l'utilisateur lorsque userProgression est mis à jour
    if (userProgression.length > 0) {
      updateUser(userProgression);
    }
  }, [userProgression]);

  return (
    <>
      <main className="main-content">
        <h1>Quizz Espace</h1>
        <ul className="cards-container">
          {mescouilles &&
            mescouilles.map((value, index) => (
              <li className="card-container" key={index}>
                <h2 className="category-name">{value.label}</h2>
                <h5 className="category-level-progression">
                  {value.level === 5
                    ? "Niveau fini"
                    : `Niveau ${value.level} / 5`}
                </h5>
                <Link
                  to={
                    value.level === 5
                      ? "/"
                      : `/quizzcontroller/${value.to}/${value.level}`
                  }
                >
                  <CardQuizz
                    src={
                      value.level === 5
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
