DROP DATABASE IF EXISTS asteriaQuizz;

CREATE DATABASE asteriaQuizz CHARACTER
SET
    utf8 COLLATE utf8_general_ci;

USE asteriaQuizz;

CREATE TABLE
    Quizz (
        id INT PRIMARY KEY AUTO_INCREMENT,
        quizz_name VARCHAR(255) CHARACTER
        SET
            utf8 COLLATE utf8_general_ci
    );

CREATE TABLE
    Question (
        id INT PRIMARY KEY AUTO_INCREMENT,
        quizz_id INT,
        question_value VARCHAR(255) CHARACTER
        SET
            utf8 COLLATE utf8_general_ci,
            photo_question VARCHAR(255) CHARACTER
        SET
            utf8 COLLATE utf8_general_ci,
            photo_answer VARCHAR(255) CHARACTER
        SET
            utf8 COLLATE utf8_general_ci,
            answer_name VARCHAR(255) CHARACTER
        SET
            utf8 COLLATE utf8_general_ci,
            answer_explanation TEXT CHARACTER
        SET
            utf8 COLLATE utf8_general_ci,
            FOREIGN KEY (quizz_id) REFERENCES Quizz (id)
    );

CREATE TABLE
    QuizOption (
        id INT PRIMARY KEY AUTO_INCREMENT,
        question_id INT,
        question_answer VARCHAR(255) CHARACTER
        SET
            utf8 COLLATE utf8_general_ci,
            is_correct BOOLEAN,
            FOREIGN KEY (question_id) REFERENCES Question (id)
    );

-- Pour le quizz "quizzSystemeSolaire01"
INSERT INTO
    Quizz (quizz_name)
VALUES
    (N'quizzSystemeSolaire01');

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
        N'La Lune est un satellite de la planète..',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677935/images-quizz/SystemeSolaireQuizz/lune_ujgnpx.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677937/images-quizz/SystemeSolaireQuizz/terre_3x_s5diuz.jpg',
        N'Terre',
        N'La Lune, aussi connue sous le nom de Terre I, est le seul satellite de la planète Terre.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (1, N'Jupiter', false),
    (1, N'Terre', true),
    (1, N'Mars', false),
    (1, N'Ce n''est pas un satellite', false);

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
        N'Quel est le nom du premier satellite artificiel envoyé en orbite autour de la Terre ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-2_uhrx5b.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-answer-2_bfoi7z.jpg',
        N'Spoutnik',
        N'Le premier satellite artificiel, Spoutnik, a été envoyé par l''URSS en 1957. Apollo est le nom des vols habités américains, Ariane est le nom d''une série de fusées européennes et Mir était une station spatiale russe.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (2, N'Apollo', false),
    (2, N'Ariane', false),
    (2, N'Mir', false),
    (2, N'Spoutnik', true);

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
        N'Combien y a-t-il de planètes dans le système solaire ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-3_tfihlo.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-answer-3_uk0i4d.jpg',
        N'8',
        N'Depuis Août 2006, Pluton n''est plus considérée comme une planète, donc notre système solaire ne compte plus que 8 planètes.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (3, N'5', false),
    (3, N'15', false),
    (3, N'17', false),
    (3, N'8', true);

-- Pour le quizz "quizzSystemeSolaire02"
INSERT INTO
    Quizz (quizz_name)
VALUES
    (N'quizzSystemeSolaire02');

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
        N'Quelles sont les deux grandes catégories de planètes ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-4_wdlmqw.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-answer-4_wdidp7.jpg',
        N'Rocheuse et gazeuze',
        N'Notre système solaire contient les deux types de planètes. Mercure, Vénus, la Terre et Mars sont des planètes rocheuses aussi appelées "planètes telluriques", alors que Jupiter, Saturne, Uranus et Neptune sont des planètes gazeuses.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (4, N'Solide et Liquide', false),
    (4, N'Rocheuse et gazeuze', true),
    (4, N'Tellurique et Rocheuse', false),
    (4, N'Liquide et Gazeuze', false);

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
        N'Quelle est la plus grande planète du système solaire ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-question-5_zotron.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-answer-5_igxkw4.jpg',
        N'Jupiter',
        N'Jupiter est la plus grande planète du Système solaire. Elle est plus de onze fois plus grosse que la Terre.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (5, N'Jupiter', true),
    (5, N'Mars', false),
    (5, N'Vénus', false),
    (5, N'Saturne', false);

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
        N'En quelle année Pluton a-t-elle été reclassée en tant que planète naine ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677936/images-quizz/SystemeSolaireQuizz/quizz-1-question-6_h73hc4.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677936/images-quizz/SystemeSolaireQuizz/quizz-1-answer-6_d5okwg.jpg',
        N'2006',
        N'Pluton a été reclassée en tant que planète naine en 2006 lors de la réunion de l''Union Astronomique Internationale.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (6, N'2006', true),
    (6, N'2010', false),
    (6, N'2008', false),
    (6, N'2012', false);

-- Pour le quizz "quizzSystemeSolaire03"
INSERT INTO
    Quizz (quizz_name)
VALUES
    (N'quizzSystemeSolaire03');

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
        3,
        N'Combien de satellites naturels Jupiter possède-t-elle ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677936/images-quizz/SystemeSolaireQuizz/quizz-1-question-7_ynrlrk.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677934/images-quizz/SystemeSolaireQuizz/quizz-1-answer-7_az89ln.jpg',
        N'79',
        N'On connaît 80 satellites naturels de Jupiter, dont 79 confirmés : 72 numérotés, et 57 nommés.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (7, N'1', false),
    (7, N'79', true),
    (7, N'2', false),
    (7, N'4', false);

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
        3,
        N'Combien de temps faut-il à la Terre pour effectuer un tour complet autour du Soleil ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-question-8_i27iwj.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-answer-8_sq5foj.jpg',
        N'365 jours',
        N'Un tour complet du circuit dure 365 jours 5 heures, 48 minutes et 45 secondes.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (8, N'120 jours', false),
    (8, N'48 heures', false),
    (8, N'365 jours', true),
    (8, N'2000 ans', false);

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
        3,
        N'Qui a marché le premier sur la Lune ?',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-question-9_aamgxk.jpg',
        N'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-answer-9_qv1ogm.jpg',
        N'Neil Armstrong',
        N'Le 16 juillet 1969, les trois astronautes américains de la mission Apollo 11, Neil Armstrong, Buzz Aldrin et Michael Collins, décollaient pour la Lune depuis la Floride, Neil Armstrong est le premier homme a avoir posé son pied sur la lune.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (9, N'Charlie Duke', false),
    (9, N'Buzz Aldrin', false),
    (9, N'Neil Armstrong', true),
    (9, N'François Pescquet', false);

-- Pour le quizz "quizzSystemeSolaire04"
INSERT INTO
    Quizz (quizz_name)
VALUES
    ('quizzSystemeSolaire04');

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
        4,
        'Quel est l''âge du système solaire ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677939/images-quizz/SystemeSolaireQuizz/quizz-1-question-10_h6apl9.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677933/images-quizz/SystemeSolaireQuizz/quizz-1-answer-10_uzdqsq.png',
        '4,567 milliards d''années',
        'L''âge de la Terre, et celui du système solaire, est de 4,567 milliards d’années, avec une incertitude de quelques dizaines de millions d’années. C’est une connaissance aujourd’hui stabilisée.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (10, '1 million d''années', false),
    (10, '4,5 milliards d''années', true),
    (10, '2022 ans', false),
    (10, '4000 ans', false);

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
        4,
        'Quelle planète surnomme-t-on ''l''étoile du berger''?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677937/images-quizz/SystemeSolaireQuizz/quizz-1-question-11_tzio1r.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677938/images-quizz/SystemeSolaireQuizz/quizz-1-answer-11_quec9l.jpg',
        'Vénus',
        'L''expression *étoile du Berger* est très ancienne. Autrefois, les gardiens de troupeaux qui vivaient au rythme des jours et des nuits, tout au long de l''année, guettaient l''apparition de la première étoile dans le ciel, le soir, pour rentrer à la bergerie.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (11, 'Mars', false),
    (11, 'Apollon', false),
    (11, 'Mercure', false),
    (11, 'Vénus', true);

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
        4,
        'Existe-t-il d''autres systèmes solaires dans l''univers ?',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677937/images-quizz/SystemeSolaireQuizz/quizz-1-question-12_n2n0nw.jpg',
        'https://res.cloudinary.com/dw3mwclgk/image/upload/v1670677937/images-quizz/SystemeSolaireQuizz/quizz-1-answer-12_g54bpb.jpg',
        'Oui',
        'Le premier système planétaire découvert autour d''une étoile de type solaire en dehors du Système solaire est celui de l''étoile 51 Pegasi en 1995. Depuis ce temps, des centaines de planètes extra-solaires ont été découvertes.'
    );

INSERT INTO
    QuizOption (question_id, question_answer, is_correct)
VALUES
    (12, 'Personne ne sait', false),
    (12, 'Non', false),
    (12, 'Oui', true),
    (12, 'Peut-être', false);