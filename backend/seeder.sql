DROP TABLE IF EXISTS `Participants`;
DROP TABLE IF EXISTS `Rounds`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Games`;
DROP TABLE IF EXISTS `GameType`;
DROP TABLE IF EXISTS `Difficulty`;
DROP TABLE IF EXISTS `Genre`;
DROP TABLE IF EXISTS `SequelizeMeta`;

-- Difficulty
INSERT INTO difficulty (id, level, createdAt, updatedAt)
VALUES (1, 'easy', NOW(), NOW());

INSERT INTO difficulty (id, level, createdAt, updatedAt)
VALUES (2, 'medium', NOW(), NOW());

INSERT INTO difficulty (id, level, createdAt, updatedAt)
VALUES (3, 'hard', NOW(), NOW());

-- Genre
INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (1, 'science', NOW(), NOW());

INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (2, 'history', NOW(), NOW());

INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (3, 'movies', NOW(), NOW());

INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (4, 'songs', NOW(), NOW());

INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (5, 'math', NOW(), NOW());

INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (6, 'sports', NOW(), NOW());

INSERT INTO genre (id, name, createdAt, updatedAt)
VALUES (7, 'geography', NOW(), NOW());


-- GameType
INSERT INTO GameType (id, name, createdAt, updatedAt)
VALUES (1, 'trivia', NOW(), NOW());

INSERT INTO GameType (id, name, createdAt, updatedAt)
VALUES (2, 'pictionary', NOW(), NOW());

-- Game
INSERT INTO Games (id, name, game_type_id, start_time, end_time, createdAt, updatedAt)
VALUES (1, 'Trivia Night', 1, '2025-04-10 19:00:00', '2025-04-10 21:00:00', NOW(), NOW());

INSERT INTO Games (id, name, game_type_id, start_time, end_time, createdAt, updatedAt)
VALUES (2, 'Pictionary Showdown', 1, '2025-04-12 18:30:00', '2025-04-12 20:00:00', NOW(), NOW());

-- Users
INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (1, 'John', 'Doe', 'john.doe@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (2, 'Jane', 'Smith', 'jane.smith@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (3, 'Alice', 'Johnson', 'alice.johnson@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (4, 'Bob', 'Brown', 'bob.brown@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (5, 'Charlie', 'Davis', 'charlie.davis@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (6, 'David', 'Martinez', 'david.martinez@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (7, 'Eva', 'Wilson', 'eva.wilson@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (8, 'Frank', 'Moore', 'frank.moore@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (9, 'Grace', 'Taylor', 'grace.taylor@example.com', NOW(), NOW());

INSERT INTO Users (id, first_name, last_name, email, createdAt, updatedAt)
VALUES (10, 'Hannah', 'Anderson', 'hannah.anderson@example.com', NOW(), NOW());

 -- Rounds
INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (1, 1, 1, 1, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Easy, Science

INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (2, 1, 2, 2, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Medium, History

INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (3, 1, 3, 3, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Hard, Movies

INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (4, 1, 2, 4, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Medium, Sports

-- Rounds for Pictionary Showdown (game_id = 2)
INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (5, 2, 1, 5, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Easy, Geography

INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (6, 2, 2, 3, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Medium, Movies

INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (7, 2, 3, 4, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Hard, Sports

INSERT INTO Rounds (id, game_id, difficulty, genre, points_per_question, createdAt, updatedAt)
VALUES (8, 2, 2, 2, ROUND(0.5 + (RAND() * (10 - 0.5)), 1), NOW(), NOW());  -- Medium, History

-- Participants
-- Participants for Trivia Night (game_id = 1)
-- Round 1: Easy, Science
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (1, 1, 1, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 1 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (2, 1, 2, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (3, 1, 3, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (4, 1, 4, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (5, 1, 5, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Round 2: Medium, History
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (6, 2, 6, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 6 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (7, 2, 7, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (8, 2, 8, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (9, 2, 9, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (10, 2, 10, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Round 3: Hard, Movies
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (11, 3, 1, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 1 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (12, 3, 2, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (13, 3, 3, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (14, 3, 4, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (15, 3, 5, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Round 4: Medium, Sports
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (16, 4, 6, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 6 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (17, 4, 7, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (18, 4, 8, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (19, 4, 9, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (20, 4, 10, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Rounds for Pictionary Showdown (game_id = 2)
-- Round 5: Easy, Geography
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (21, 5, 1, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 1 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (22, 5, 2, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (23, 5, 3, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (24, 5, 4, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (25, 5, 5, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Round 6: Medium, Movies
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (26, 6, 6, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 6 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (27, 6, 7, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (28, 6, 8, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (29, 6, 9, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (30, 6, 10, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Round 7: Hard, Sports
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (31, 7, 1, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 1 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (32, 7, 2, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (33, 7, 3, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (34, 7, 4, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (35, 7, 5, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());

-- Round 8: Medium, History
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (36, 8, 6, ROUND(RAND() * 10, 1), TRUE, NOW(), NOW());  -- User 6 is the winner
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (37, 8, 7, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (38, 8, 8, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (39, 8, 9, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
INSERT INTO Participants (id, round_id, user_id, score, is_winner, createdAt, updatedAt)
VALUES (40, 8, 10, ROUND(RAND() * 10, 1), FALSE, NOW(), NOW());
 