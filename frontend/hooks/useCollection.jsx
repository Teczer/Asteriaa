import { useAuthContext } from "./useAuthContext";

export const useCollection = () => {
  const { user } = useAuthContext();

  console.log("user", user);

  // IF USER IS NOT CONNECTED
  const progressionSystemeSolaireLocal = localStorage.getItem(
    "quizzSystemeSolaire"
  );
  const progressionGalaxiesLocal = localStorage.getItem("quizzGalaxies");
  const progressionPhenomenesObservablesLocal = localStorage.getItem(
    "quizzPhenomenesObservables"
  );
  const progressionAstronautesLocal = localStorage.getItem("quizzAstronautes");

  const collections = [
    // SYSTEME SOLAIRE
    {
      slug: "quizzSystemeSolaire",
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
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1699786532/images-collections/1-systeme%20solaire/qaiavf9gtnqzjkgcqvab.webp",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-2-comet_eqhukk.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675179/images-collections/1-systeme%20solaire/collec1-cardBackImage-3-neptune_naijmj.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-4-asteroid_rdlqob.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/1-systeme%20solaire/collec1-cardBackImage-5-saturn_cirea3.jpg",
      ],
      cardFunFactIcon1: ["⭕", "👁️", "⭕", "🔍", "⭕"],
      cardFunFactIcon2: ["📏", "☄️", "📏", "☄️", "📏"],
      cardFunFactIcon3: ["🌡️", "📏", "🌡️", "🗺️", "🌡️"],
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
      slug: "quizzGalaxies",
      collectionName: "Galaxies",
      collectionLevel: user
        ? user?.quizzGalaxies || 1
        : progressionGalaxiesLocal,
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
      slug: "quizzPhenomenesObservables",
      collectionName: "Phénomènes observables",
      collectionLevel: user
        ? user?.quizzPhenomenesObservables || 1
        : progressionPhenomenesObservablesLocal,
      cardTitle: [
        "Éclipse",
        "Super Lune",
        "Étoiles filantes",
        "Lumière zodiacale",
        "Météorite",
      ],
      cardNumber: ["1", "2", "3", "4", "5"],
      cardFrontImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675178/images-collections/3-phenomenes/collec3-cardFrontImage-11-eclipse_v9zoij.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675175/images-collections/3-phenomenes/collec3-cardFrontImage-12-moon_veahxq.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardFrontImage-13-etoile_vvl1xp.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675175/images-collections/3-phenomenes/collec3-cardFrontImage-14-zod-light_jrleep.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardFrontImage-15-meteorite_g1lsyw.jpg",
      ],
      cardBackImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardBackImage-11-eclipse_hqzlbx.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675174/images-collections/3-phenomenes/collec3-cardBackImage-12-moon_u7ezkl.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardBackImage-13-etoile_jfmy1t.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/3-phenomenes/collec3-cardBackImage-14-zod-light_txkudi.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675176/images-collections/3-phenomenes/collec3-cardBackImage-15-meteorite_npetr8.jpg",
      ],
      cardFunFactIcon1: ["🌙", "📏", "⛰️", "💡", "🔍"],
      cardFunFactIcon2: ["⏲️", "🌕", "🏃‍♂️", "📐", "📅"],
      cardFunFactIcon3: ["🔭", "📜", "⛈️", "🧩", "💨"],
      cardFunFactName1: [
        "Éclipes par an",
        "Distance la plus courte",
        "Altitude moyenne",
        "Luminosité",
        "Première découverte",
      ],
      cardFunFactName2: [
        "Durée moyenne",
        "Super lunes par an",
        "Vitesse moyenne",
        "Dimensions",
        "Chutes par an",
      ],
      cardFunFactName3: [
        "Première observation",
        "Nom officiel",
        "Plus grosse tempête",
        "Composition",
        "Vitesse de chute",
      ],
      cardFunFact1: [
        "4 à 7",
        "356 511 km en 2016",
        "Entre 65 et 135 km",
        "Faible",
        "an 861",
      ],
      cardFunFact2: [
        "7 minutes",
        "3 à 4",
        "40 km/s",
        "5 à 10 degrés de large",
        "2000 à 5000 (plus d'1kg)",
      ],
      cardFunFact3: [
        "1312 av. J.-C",
        "périgée-syzygie",
        "200 000 étoiles par heure (1966)",
        "poussière cosmique",
        "de 11 à 72 km/s",
      ],
      cardDescription: [
        "Une éclipse est la disparition apparente et temporaire, pour un observateur, de tout ou partie d'un astre résultant de l'interposition d'un autre objet céleste soit entre cet astre et la source de lumière qui l'éclaire, soit entre cet astre et l'œil de l'observateur. La disparition de l'astre éclipsé, ou occulté, est son immersion; sa réapparition, son émersion. Il existe plusieurs sortes d'éclipses notamment les éclipses de Lune et celles de Soleil, ces dernières étant plus rares.",
        "Une super lune désigne une pleine ou nouvelle lune qui se produit lorsque la Lune est à sa plus courte distance de la Terre. Visuellement, il est difficile de percevoir une différence avec les autres pleines lunes de l'année. En effet, la taille apparente de notre satellite dans le ciel varie entre 0,48 et 0,56 degré selon sa position sur son orbite. Une vraie « superlune » peut apparaître 14 % plus grande qu'une Pleine Lune qui coïncide avec l'apogée.",
        "Une étoile filante est le phénomène lumineux qui accompagne l'entrée dans l'atmosphère d'un corps appelé météoroïde. Cette traînée lumineuse est causée par la vaporisation du corps et l'ionisation de l'air sur sa trajectoire, le météoroïde laissant derrière lui un sillage de gaz très chaud, ionisé et lumineux que l'on nomme un plasma. L'échauffement à l'origine du plasma est principalement dû à la compression de l'atmosphère en avant du corps supersonique et non à la friction.",
        "La lumière zodiacale est une faible lueur de forme vaguement triangulaire visible sur le ciel nocturne et qui s'étend le long de l'axe du Soleil sur le plan du zodiaque, qui lui a donné son nom. Ce phénomène apparaît après le coucher du Soleil au printemps, ou avant son lever à l'automne, quand le zodiaque est perpendiculaire à l'horizon. Il est dû à la réflexion de la lumière solaire sur la poussière cosmique orbitant proche de la Terre.",
        "Une météorite est un objet solide d'origine extraterrestre qui en traversant l'atmosphère terrestre n'a pas perdu toute sa masse, et qui en a atteint la surface solide sans y être entièrement volatilisé lors de l'impact avec cette surface. Les météorites portent le nom d'un lieu près duquel elles sont tombées ou ont été trouvées, généralement celui d'une municipalité ou d'une entité géographique.",
      ],
    },
    // ASTRONAUTES
    {
      slug: "quizzAstronautes",
      collectionName: "Astronautes",
      collectionLevel: user
        ? user?.quizzAstronautes || 1
        : progressionAstronautesLocal,
      cardTitle: ["Gagarine", "Armstrong", "Leonov", "Chrétien", "Terechkova"],
      cardNumber: ["1", "2", "3", "4", "5"],
      cardFrontImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675174/images-collections/4-astronautes/collec4-cardFrontImage-16-gagarine_nrk3re.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675177/images-collections/4-astronautes/collec4-cardFrontImage-17-armstrong_zrq05u.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardFrontImage-18-leonov_xri8tn.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675172/images-collections/4-astronautes/collec4-cardFrontImage-19-chretien_rihk2v.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675172/images-collections/4-astronautes/collec4-cardFrontImage-20-terechkova_exxykb.jpg",
      ],
      cardBackImage: [
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-16-gagarine_kyzvbh.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-17-armstrong_stxghf.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-18-leonov_tglmp7.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-19-chretien_yynnis.jpg",
        "https://res.cloudinary.com/dw3mwclgk/image/upload/v1670675173/images-collections/4-astronautes/collec4-cardBackImage-20-terechkova_nuti1l.jpg",
      ],
      cardFunFactIcon1: ["☭", "🇺🇸", "☭", "🇫🇷", "☭"],
      cardFunFactIcon2: ["💼", "💼", "💼", "💼", "💼"],
      cardFunFactIcon3: ["⭐", "⭐", "⭐", "⭐", "⭐"],
      cardFunFactName1: [
        "Nationalité",
        "Nationalité",
        "Nationalité",
        "Nationalité",
        "Nationalité",
      ],
      cardFunFactName2: [
        "Profession",
        "Profession",
        "Profession",
        "Profession",
        "Profession",
      ],
      cardFunFactName3: [
        "Particularité",
        "Particularité",
        "Particularité",
        "Particularité",
        "Particularité",
      ],
      cardFunFact1: [
        "Soviétique",
        "Américaine",
        "Soviétique",
        "Française",
        "Soviétique",
      ],
      cardFunFact2: [
        "Pilote de chasse",
        "Pilote de chasse",
        "Pilote de chasse",
        "Pilote de chasse",
        "Instructrice de parachutisme",
      ],
      cardFunFact3: [
        "Premier homme dans l'espace",
        "Premier homme sur la Lune",
        "Première sortie extravéhiculaire",
        "Premier français dans l'espace",
        "Première femme dans l'espace",
      ],
      cardDescription: [
        "Youri Gagarine est le tout premier être humain à avoir effectué un vol dans l’espace, au cours de la mission Vostok 1 le 12 avril 1961. Les chances de réussite de la mission étaient estimées à 50%. Une fois lancé, le vaisseau est resté 1h48 en orbite autour de la Terre, à une altitude moyenne de 250 km. Aucune expérience n’était prévue, les spécialistes n’étant pas sûrs des capacités de l’être humain soumis à l’apesanteur.",
        "Neil Armstrong est le premier homme à avoir posé le pied sur la Lune, le 21 juillet 1969 au cours de la mission Apollo 11. Il a prononcé la désormais célèbre phrase : « C’est un petit pas pour l’homme, mais un bond de géant pour l’humanité ». Les échanges radio sont diffusés en direct dans le monde entier, et on estime que 13% de la population mondiale à suivi la sortie d’Armstrong. Au total, l’équipage est resté plus de 21h sur la Lune, dont 2h30 en sortie extravéhiculaire.",
        "Alexei Leonov est le premier homme à avoir réalisé une sortie extravéhiculaire dans l’espace, le 18 mars 1965. Relié par un filin de 4,5m, Leonov est frappé par le silence qui règne, au point qu’il entend le bruit de son propre corps. La sortie extravéhiculaire aura duré en tout 12 minutes. Après ses différentes missions, Leonov devient responsable de l’entrainement des cosmonautes soviétiques.",
        "Jean-Loup Chrétien est le premier français et premier européen à effectuer un vol habité, du 25 juin au 2 juillet 1982. Plusieurs expériences ont été réalisées lors de cette mission, notamment l’étude des réactions de l’homme en impesanteur, le comportement de certains matériaux en impesanteur ou encore l’étude de galaxies.",
        "Valentina Terechkova est la première femme à être allée dans l’espace. Elle a effectué seule un vol de près de 3 jours, du 16 au 19 juin 1963. Une caméra installée à bord du vaisseau a diffusé les images de la cosmonaute dans le monde entier. Elle reste à ce jour la seule femme ayant voyagé en solitaire dans l’espace, ainsi que la plus jeune cosmonaute (elle avait 26 ans au moment du vol).",
      ],
    },
  ];

  return collections;
};
