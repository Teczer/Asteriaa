DROP DATABASE IF EXISTS asteriaQuizz;

CREATE DATABASE asteriaQuizz;

USE asteriaQuizz;

CREATE TABLE
    Quizz (
        id INT PRIMARY KEY AUTO_INCREMENT,
        quizz_name VARCHAR(255)
    );

CREATE TABLE
    Question (
        id INT PRIMARY KEY AUTO_INCREMENT,
        quizz_id INT,
        question_value VARCHAR(255),
        photo_question VARCHAR(255),
        photo_answer VARCHAR(255),
        answer_name VARCHAR(255),
        answer_explanation TEXT,
        FOREIGN KEY (quizz_id) REFERENCES Quizz (id)
    );

CREATE TABLE
    Option (
        id INT PRIMARY KEY AUTO_INCREMENT,
        question_id INT,
        question_answer VARCHAR(255),
        is_correct BOOLEAN,
        FOREIGN KEY (question_id) REFERENCES Question (id)
    );

-- Pour le quizz "quizzSystemeSolaire01"
INSERT INTO
    Quizz (quizz_name)
VALUES
    ('quizzSystemeSolaire01');

INSERT INTO
    Question (
        quizz_id,
        question_value,
        photo_question,
        photo_answer,
        answer_name,
        answer_explanation
    )
VALUES
    (
        1,
        'La Lune est un satellite de la planète...',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677935/images-quizz/SystemeSolaireQuizz/lune_ujgnpx.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677937/images-quizz/SystemeSolaireQuizz/terre_3x_s5diuz.jpg',
        'Terre',
        'La **Lune**, aussi connue sous le nom de **Terre I**, est le seul satellite de la planète Terre.'
    );

INSERT INTO
    Option (question_id, question_answer, is_correct)
VALUES
    (1, 'Jupiter', false),
    (1, 'Terre', true),
    (1, 'Mars', false),
    (1, 'Ce n\'est pas un satellite', false);

INSERT INTO
    Question (
        quizz_id,
        question_value,
        photo_question,
        photo_answer,
        answer_name,
        answer_explanation
    )
VALUES
    (
        1,
        'Quel est le nom du premier satellite artificiel envoyé en orbite autour de la Terre ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-2_uhrx5b.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-answer-2_bfoi7z.jpg',
        'Spoutnik',
        'Le premier satellite artificiel, **Spoutnik**, a été envoyé par l\'URSS en 1957. **Apollo** est le nom des vols habités américains, **Ariane** est le nom d\'une série de fusées européennes et **Mir** était une station spatiale russe.'
    );

INSERT INTO
    Option (question_id, question_answer, is_correct)
VALUES
    (2, 'Apollo', false),
    (2, 'Ariane', false),
    (2, 'Mir', false),
    (2, 'Spoutnik', true);

INSERT INTO
    Question (
        quizz_id,
        question_value,
        photo_question,
        photo_answer,
        answer_name,
        answer_explanation
    )
VALUES
    (
        1,
        'Combien y a-t-il de planètes dans le système solaire ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-3_tfihlo.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-answer-3_uk0i4d.jpg',
        '8',
        'Depuis Août 2006, **Pluton** n\'est plus considérée comme une planète, donc notre système solaire ne compte plus que **8 planètes**.'
    );

INSERT INTO
    Option (question_id, question_answer, is_correct)
VALUES
    (3, '5', false),
    (3, '15', false),
    (3, '17', false),
    (3, '8', true);

-- Pour le quizz "quizzSystemeSolaire02"
INSERT INTO
    Quizz (quizz_name)
VALUES
    ('quizzSystemeSolaire02');

INSERT INTO
    Question (
        quizz_id,
        question_value,
        photo_question,
        photo_answer,
        answer_name,
        answer_explanation
    )
VALUES
    (
        2,
        'Quelles sont les deux grandes catégories de planètes ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-4_wdlmqw.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-answer-4_wdidp7.jpg',
        'Rocheuse et gazeuze',
        'Notre système solaire contient les **deux types de planètes**. Mercure, Vénus, la Terre et Mars sont des **planètes rocheuses** aussi appelées "planètes tellurique" alors que Jupiter, Saturne, Uranus et Neptune sont des **planètes gazeuses**.'
    );

INSERT INTO
    Option (question_id, question_answer, is_correct)
VALUES
    (4, 'Solide et Liquide', false),
    (4, 'Rocheuse et gazeuze', true),
    (4, 'Tellurique et Rocheuse', false),
    (4, 'Liquide et Gazeuze', false);

INSERT INTO
    Question (
        quizz_id,
        question_value,
        photo_question,
        photo_answer,
        answer_name,
        answer_explanation
    )
VALUES
    (
        2,
        'Quelle est la plus grande planète du système solaire ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-question-5_zotron.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-answer-5_igxkw4.jpg',
        'Jupiter',
        'Jupiter est la plus grande planète du Système solaire. Elle est plus de **onze fois plus grosse** que la Terre.'
    );

INSERT INTO
    Option (question_id, question_answer, is_correct)
VALUES
    (5, 'Jupiter', true),
    (5, 'Mars', false),
    (5, 'Vénus', false),
    (5, 'Saturne', false);

INSERT INTO
    Question (
        quizz_id,
        question_value,
        photo_question,
        photo_answer,
        answer_name,
        answer_explanation
    )
VALUES
    (
        2,
        'En quelle année Pluton a-t-elle été reclassée en tant que planète naine ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677936/images-quizz/SystemeSolaireQuizz/quizz-1-question-6_h73hc4.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677936/images-quizz/SystemeSolaireQuizz/quizz-1-answer-6_d5okwg.jpg',
        '2006',
        'Depuis Août 2006, **Pluton** n\'est plus considérée comme une planète, elle a donc été classée comme **planète naine**.'
    );

INSERT INTO
    Option (question_id, question_answer, is_correct)
VALUES
    (6, '1998', false),
    (6, '2013', false),
    (6, '2006', true),
    (6, '2020', false);