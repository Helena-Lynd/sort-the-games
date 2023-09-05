DROP TABLE IF EXISTS game_data CASCADE;

CREATE TABLE game_data (
    id              SERIAL PRIMARY KEY NOT NULL,
);

INSERT INTO game_data (id)
VALUES                (0)