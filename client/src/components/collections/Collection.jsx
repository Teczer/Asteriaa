import { useState } from "react";
import "./collection.scss";
import ActualCardViewFront from "./ActualCardViewFront";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function Collection() {
  const { user } = useAuthContext();

  console.log("user", user);

  const progressionSystemeSolaireLocal = localStorage.getItem(
    "quizzSystemeSolaire"
  );
  const progressionGalaxiesLocal = localStorage.getItem("quizzGalaxies");

  let collections = [
    // SYSTEME SOLAIRE
    {
      collectionName: "Système Solaire",
      collectionLevel: user
        ? user?.quizzSystemeSolaire || 1
        : progressionSystemeSolaireLocal,
      cardTitle: ["Soleil", "Comète", "Neptune", "Astéroïde", "Saturne"],
      cardNumber: ["1", "2", "3", "4", "5"],
      cardFrontImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardFrontImage-1-soleil_bb36ak.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675181/images-collections/1-systeme%20solaire/collec1-cardFrontImage-2-comet_wnzq4h.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/1-systeme%20solaire/collec1-cardFrontImage-3-neptune_nnivz7.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardFrontImage-4-asteroid_nbo1cz.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardFrontImage-5-saturn_ncxgiv.jpg",
      ],
      cardBackImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-1-soleil_fcgefa.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-2-comet_eqhukk.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardBackImage-3-neptune_naijmj.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-4-asteroid_rdlqob.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-5-saturn_cirea3.jpg",
      ],
      cardFunFactIcon1: ["⭕", "👁️", "☄️", "☄️"],
      cardFunFactIcon2: ["📏", "☄️", "☄️", "☄️"],
      cardFunFactIcon3: ["🌡️", "📏", "☄️", "☄️"],
      cardFunFactName1: [
        "Diamètre",
        "Premières observations",
        "Diamètre",
        "Première découverte",
        "Diamètre",
      ],
      cardFunFactName2: [
        "Distance de la terre",
        "Comètes répertoriées",
        "Distance de la terre",
        "Astéroïdes répertoriés",
        "Distance de la terre",
      ],
      cardFunFactName3: [
        "Température",
        "Plus longue traînée",
        "Température",
        "Première exploration",
        "Température",
      ],
      cardFunFact1: [
        "1,4 millions de km (109 fois la Terre)",
        "1059 av. J.C.",
        "49 244 km (3,9 fois la Terre)",
        "1801 Astéroïde Cérès",
        "116 464 km (9,4 fois la Terre)",
      ],
      cardFunFact2: [
        "150 millions de kilomètres",
        "4 352 à ce jour",
        "4,3 milliards de kilomètres",
        "plus de 720 000",
        "1,3 milliards de kilomètres",
      ],
      cardFunFact3: [
        "5500°C en surface",
        "580 millions de kilomètres",
        "-218,15°C en surface",
        "Sonde Galileo en 1991",
        "-189°C en surface",
      ],
      cardDescription: [
        "Le Soleil est une étoile de type naine jaune, principalement composée d’hydrogène (74%) et d’hélium (25%), et âgée de 4,5 millards d’années. Le nom Soleil vient du latin classique « sol », qui désigne l’astre, et « solis » renvoyant au Soleil en tant que divinité. Sa surface n’est pas solide mais constituée de gaz, qu’on appelle photosphère et qui émet sa lumière la plus visible. Son noyau peut atteindre 15 millions de degrés Celsius.",
        "Une comète est un petit corps céleste constitué d’un noyau de glace et de poussière en orbite autour d’une étoile. Lorsqu’elle s’approche de cette étoile, le noyau s’entoure d’une sorte de fine atmosphère brillante constituée de gaz et de poussières, appelée chevelure, souvent prolongée de deux traînées lumineuses, qu’on appelle les queues, et qui peuvent s’étendre sur plusieurs centaines de millions de km. Le mot « comète » vient du grec ancien et signifie « astre chevelu ».",
        "Neptune est la planète la plus éloignée du système solaire. Les conditions particulières de Neptune transformeraient le carbone présent en diamant. Ces diamants tomberaient ensuite vers le noyau, donnant naissance à une pluie de nanodiamants. Invisible à l'œil nu, Neptune est la première planète du système solaire à avoir été découverte par déduction plutôt que par observation.",
        "Un astéroïde est un corps céleste composé de roches et de métaux, dont la taille peut aller de quelques centimètres à plusieurs kilomètres. La majorité se situe dans la zone comprise entre Mars et Jupiter, appelée la ceinture d’astéroïdes. Les astéroïdes dits géocroiseurs évoluent proches de la Terre, et sont étroitement surveillés afin de prévenir toute collision avec la Terre. On en dénombre plus de 20 000.",
        "Deuxième géante gazeuse du système solaire, Saturne se distingue par son système d’anneaux (7 en tout), et elle possède également le plus grand nombre de satellites naturels (82). Elle est composée d’un noyau rocheux de silicates et de fer, entouré de couches constituées à 96% d’hydrogène. Les vents sur Saturne peuvent atteindre une vitesse de 1800 km/h. Connue depuis la préhistoire, elle a longtemps été la planète la plus éloignée du Soleil connue.",
      ],
    },
    // GALAXIES
    {
      collectionName: "Galaxies",
      collectionLevel: 5,
      cardTitle: [
        "Voie lactée",
        "Whirlpool",
        "Andromède",
        "Magellan",
        "Horsehead Nebula",
      ],
      cardNumber: ["1", "2", "3", "4", "5"],
      cardFrontImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/2-galaxies/collec2-cardFrontImage-6-voielactee_emeafm.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675171/images-collections/2-galaxies/collec2-cardFrontImage-7-whirlpool_xmk2zn.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675169/images-collections/2-galaxies/collec2-cardFrontImage-8-andromede_gmy2sv.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675170/images-collections/2-galaxies/collec2-cardFrontImage-9-magellan_fawb7z.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675171/images-collections/2-galaxies/collec2-cardFrontImage-10-horsehead_ixzx8i.jpg",
      ],
      cardBackImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675172/images-collections/2-galaxies/collec2-cardBackImage-6-voielactee_c8hzlj.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675181/images-collections/2-galaxies/collec2-cardBackImage-7-whirlpool_psotch.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675171/images-collections/2-galaxies/collec2-cardBackImage-8-andromede_ynm3cw.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675170/images-collections/2-galaxies/collec2-cardBackImage-9-magellan_bzwcww.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675172/images-collections/2-galaxies/collec2-cardBackImage-10-horsehead_s4hdxr.jpg",
      ],
      cardFunFactIcon1: ["🌀", "🌀", "🌀", "🌀", "☁️"],
      cardFunFactIcon2: ["📏", "⭕", "⭕", "⭕", "🕵️"],
      cardFunFactIcon3: ["✨", "📏", "✨", "📏", "📏"],
      cardFunFactName1: ["Forme", "Forme", "Forme", "Forme", "Forme"],
      cardFunFactName2: [
        "Diamètre",
        "Diamètre",
        "Diamètre",
        "Diamètre",
        "Découverte",
      ],
      cardFunFactName3: [
        "Nombre d'étoiles",
        "Distance",
        "Nombre d'étoiles",
        "Distance",
        "Distance de la terre",
      ],
      cardFunFact1: [
        "Spirale",
        "Spirale",
        "Spirale",
        "Spirale",
        "Nébuleuse nuageuse",
      ],
      cardFunFact2: [
        "entre 100K et 200K années-lumières",
        "76 000 années-lumières",
        "220 000 années-lumières",
        "14 000 années-lumières",
        "1888",
      ],
      cardFunFact3: [
        "entre 200 et 400 milliards",
        "27 millions d'années-lumières",
        "Mille milliards",
        "163 000 années-lumières",
        "1 500 années-lumières",
      ],
      cardDescription: [
        "La Voie Lactée est la galaxie qui abrite notre système solaire. Son aspect blanchâtre « lacté » est dû à l’accumulation d’une multitude d’étoiles que l’on ne peut distinguer à l’oeil nu. Observée dès l'Antiquité par les Anciens, elle est ainsi baptisée d'après la mythologie grecque, selon laquelle Héra aurait arraché Héraclès, fils de Zeus, de son sein, faisant ainsi gicler le lait sur la voûte céleste.",
        "La galaxie du Tourbillon est une galaxie spirale reliée à une autre galaxie plus petite par un pont de matière. Sa structure en spirale provient de l’interaction étroite entre elle et la galaxie voisine. Observable au télescope, elle se trouve à l’extrémité du manche de la Grande Ourse, dans la constellation des Chiens de Chasse. Découverte en 1773, c’est l’un des plus beaux objets célestes de l’univers.",
        "Appelée grande nébuleuse d’Andromède jusqu'à ce que sa vraie nature ait été reconnue dans les années 1920, la galaxie d'Andromède est la galaxie spirale la plus proche de la Voie lactée. Elle contiendrait environ mille milliards d'étoiles, soit deux à cinq fois plus que notre galaxie. La galaxie d’Andromède est l’une des rares galaxies observables à l’oeil nu depuis la Terre dans l’hémisphère nord. C’est également l’un des objets les plus étendus de la voûte céleste.",
        "Le Grand Nuage de Magellan est une galaxie naine satellite de la Voie lactée. Visible dans le ciel nocturne de l’hémisphère sud, il a été découvert vers l’an 964, mais c’est l’expédition de Magellan autour de la Terre entre 1519 et 1522 qui le popularisera et lui donnera son nom. Le Grand Nuage de Magellan pourrait entrer en collision avec la Voie lactée dans 2 milliards d'années.",
        "La nébuleuse à la tête de cheval est une nébuleuse obscure dans la constellation d’Orion. Elle est facilement reconnaissable par la forme en tête de cheval qui lui a donné son nom et qui se découpe dans la nébuleuse. L’obscurité de la tête de cheval est causée par la présence d’un nuage dense de gaz et de poussière.",
      ],
    },
    // PHENOMENES OBSERVABLES
    {
      collectionName: "Galaxies",
      collectionLevel: user
        ? user?.quizzGalaxies || 1
        : progressionGalaxiesLocal,
      cardTitle: ["Soleil", "Comète", "Neptune", "Astéroïde", "Saturne"],
      cardNumber: ["1", "2", "3", "4", "5"],
      cardFrontImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardFrontImage-1-soleil_bb36ak.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675181/images-collections/1-systeme%20solaire/collec1-cardFrontImage-2-comet_wnzq4h.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/1-systeme%20solaire/collec1-cardFrontImage-3-neptune_nnivz7.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardFrontImage-4-asteroid_nbo1cz.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardFrontImage-5-saturn_ncxgiv.jpg",
      ],
      cardBackImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-1-soleil_fcgefa.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-2-comet_eqhukk.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardBackImage-3-neptune_naijmj.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-4-asteroid_rdlqob.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-5-saturn_cirea3.jpg",
      ],
      cardFunFactIcon1: ["⭕", "👁️"],
      cardFunFactIcon2: ["📏", "☄️"],
      cardFunFactIcon3: ["🌡️", "📏"],
      cardFunFactName1: [
        "Diamètre",
        "Premières observations",
        "Diamètre",
        "Première découverte",
        "Diamètre",
      ],
      cardFunFactName2: [
        "Distance de la terre",
        "Comètes répertoriées",
        "Distance de la terre",
        "Astéroïdes répertoriés",
        "Distance de la terre",
      ],
      cardFunFactName3: [
        "Température",
        "Plus longue traînée",
        "Température",
        "Première exploration",
        "Température",
      ],
      cardFunFact1: [
        "1,4 millions de km (109 fois la Terre)",
        "1059 av. J.C.",
        "49 244 km (3,9 fois la Terre)",
        "1801 Astéroïde Cérès",
        "116 464 km (9,4 fois la Terre)",
      ],
      cardFunFact2: [
        "150 millions de kilomètres",
        "4 352 à ce jour",
        "4,3 milliards de kilomètres",
        "plus de 720 000",
        "1,3 milliards de kilomètres",
      ],
      cardFunFact3: [
        "5500°C en surface",
        "580 millions de kilomètres",
        "-218,15°C en surface",
        "Sonde Galileo en 1991",
        "-189°C en surface",
      ],
      cardDescription: [
        "Le Soleil est une étoile de type naine jaune, principalement composée d’hydrogène (74%) et d’hélium (25%), et âgée de 4,5 millards d’années. Le nom Soleil vient du latin classique « sol », qui désigne l’astre, et « solis » renvoyant au Soleil en tant que divinité. Sa surface n’est pas solide mais constituée de gaz, qu’on appelle photosphère et qui émet sa lumière la plus visible. Son noyau peut atteindre 15 millions de degrés Celsius.",
        "Une comète est un petit corps céleste constitué d’un noyau de glace et de poussière en orbite autour d’une étoile. Lorsqu’elle s’approche de cette étoile, le noyau s’entoure d’une sorte de fine atmosphère brillante constituée de gaz et de poussières, appelée chevelure, souvent prolongée de deux traînées lumineuses, qu’on appelle les queues, et qui peuvent s’étendre sur plusieurs centaines de millions de km. Le mot « comète » vient du grec ancien et signifie « astre chevelu ».",
        "Neptune est la planète la plus éloignée du système solaire. Les conditions particulières de Neptune transformeraient le carbone présent en diamant. Ces diamants tomberaient ensuite vers le noyau, donnant naissance à une pluie de nanodiamants. Invisible à l'œil nu, Neptune est la première planète du système solaire à avoir été découverte par déduction plutôt que par observation.",
        "Un astéroïde est un corps céleste composé de roches et de métaux, dont la taille peut aller de quelques centimètres à plusieurs kilomètres. La majorité se situe dans la zone comprise entre Mars et Jupiter, appelée la ceinture d’astéroïdes. Les astéroïdes dits géocroiseurs évoluent proches de la Terre, et sont étroitement surveillés afin de prévenir toute collision avec la Terre. On en dénombre plus de 20 000.",
        "Deuxième géante gazeuse du système solaire, Saturne se distingue par son système d’anneaux (7 en tout), et elle possède également le plus grand nombre de satellites naturels (82). Elle est composée d’un noyau rocheux de silicates et de fer, entouré de couches constituées à 96% d’hydrogène. Les vents sur Saturne peuvent atteindre une vitesse de 1800 km/h. Connue depuis la préhistoire, elle a longtemps été la planète la plus éloignée du Soleil connue.",
      ],
    },
    // ASTRONAUTES
  ];

  const [actualCardView, setActualCardView] = useState(null);

  const handleCardClick = (collection, cardIndex) => {
    const selectedCard = {
      collectionName: collection.collectionName,
      cardTitle: collection.cardTitle[cardIndex],
      cardNumber: collection.cardNumber[cardIndex],
      cardFrontImage: collection.cardFrontImage[cardIndex],
      cardBackImage: collection.cardBackImage[cardIndex],
      cardFunFactIcon1: collection.cardFunFactIcon1[cardIndex],
      cardFunFactIcon2: collection.cardFunFactIcon2[cardIndex],
      cardFunFactIcon3: collection.cardFunFactIcon3[cardIndex],
      cardFunFactName1: collection.cardFunFactName1[cardIndex],
      cardFunFactName2: collection.cardFunFactName2[cardIndex],
      cardFunFactName3: collection.cardFunFactName3[cardIndex],
      cardFunFact1: collection.cardFunFact1[cardIndex],
      cardFunFact2: collection.cardFunFact2[cardIndex],
      cardFunFact3: collection.cardFunFact3[cardIndex],
      cardDescription: collection.cardDescription[cardIndex],
    };
    setActualCardView(selectedCard);
  };

  console.log("actualCardView", actualCardView);
  return (
    <main className="main-content">
      <div className="category-title-cards-container">
        {actualCardView ? (
          <div
            className="actualCardView-layout"
            onClick={() => setActualCardView(null)}
          >
            <ActualCardViewFront actualCardView={actualCardView} />
          </div>
        ) : (
          collections.map((collection, index) => (
            <div key={index} className="collection-card">
              <h3 className="title-category-collection">
                {collection.collectionName}
              </h3>
              <div className="cards-wrapper">
                {collection.cardTitle
                  .slice(0, collection.collectionLevel)
                  .map((title, cardIndex) => (
                    <article
                      key={cardIndex}
                      className="card"
                      onClick={() => handleCardClick(collection, cardIndex)}
                    >
                      <img
                        src={collection.cardFrontImage[cardIndex]}
                        alt={title}
                        style={{ borderRadius: 20 }}
                      />
                    </article>
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
