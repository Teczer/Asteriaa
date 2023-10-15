import "./collection.scss";

export default function Collection() {
  let collections = [
    {
      collectionName: "Système Solaire",
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
      cardFunFactIcon1: ["⊘"],
      cardFunFactIcon2: ["⬅️"],
      cardFunFactIcon3: ["🌡️"],
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
        ,
        "Une comète est un petit corps céleste constitué d’un noyau de glace et de poussière en orbite autour d’une étoile. Lorsqu’elle s’approche de cette étoile, le noyau s’entoure d’une sorte de fine atmosphère brillante constituée de gaz et de poussières, appelée chevelure, souvent prolongée de deux traînées lumineuses, qu’on appelle les queues, et qui peuvent s’étendre sur plusieurs centaines de millions de km. Le mot « comète » vient du grec ancien et signifie « astre chevelu ».",
        ,
        "Neptune est la planète la plus éloignée du système solaire. Les conditions particulières de Neptune transformeraient le carbone présent en diamant. Ces diamants tomberaient ensuite vers le noyau, donnant naissance à une pluie de nanodiamants. Invisible à l'œil nu, Neptune est la première planète du système solaire à avoir été découverte par déduction plutôt que par observation.",
        ,
        "Un astéroïde est un corps céleste composé de roches et de métaux, dont la taille peut aller de quelques centimètres à plusieurs kilomètres. La majorité se situe dans la zone comprise entre Mars et Jupiter, appelée la ceinture d’astéroïdes. Les astéroïdes dits géocroiseurs évoluent proches de la Terre, et sont étroitement surveillés afin de prévenir toute collision avec la Terre. On en dénombre plus de 20 000.",
        ,
        "Deuxième géante gazeuse du système solaire, Saturne se distingue par son système d’anneaux (7 en tout), et elle possède également le plus grand nombre de satellites naturels (82). Elle est composée d’un noyau rocheux de silicates et de fer, entouré de couches constituées à 96% d’hydrogène. Les vents sur Saturne peuvent atteindre une vitesse de 1800 km/h. Connue depuis la préhistoire, elle a longtemps été la planète la plus éloignée du Soleil connue.",
      ],
    },
  ];
  return (
    <main className="main-content">
      <div className="category-title-cards-container">
        {collections &&
          collections.map((collection, index) => (
            <>
              <h3 className="title-category-collection">
                {collection.collectionName}
              </h3>
              <div className="cards-wrapper">
                <article>
                  <img src={collection.cardFrontImage} alt="" />
                </article>
              </div>
            </>
          ))}
      </div>
    </main>
  );
}
