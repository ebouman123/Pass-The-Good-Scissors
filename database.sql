CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "project" (
    "id" SERIAL PRIMARY KEY,
    "projectName" VARCHAR (80) UNIQUE NOT NULL,
    "projectComment" VARCHAR (400),
    "finishedQuiltName" VARCHAR (80) UNIQUE,
	"finishedQuiltComment" VARCHAR (400),
	"user_id" INTEGER REFERENCES "user"
);

CREATE TABLE "fabric" (
    "id" SERIAL PRIMARY KEY,
    "fabricName" VARCHAR (80) UNIQUE NOT NULL,
    "fabricComment" VARCHAR (400),
    "fabricLink" VARCHAR (200),
	"user_id" INTEGER REFERENCES "user"
);