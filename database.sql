CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "quilt" (
    "id" SERIAL PRIMARY KEY,
    "quiltName" VARCHAR (80) UNIQUE NOT NULL,
	"quiltComment" VARCHAR (400),
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE
);

CREATE TABLE "fabric" (
    "id" SERIAL PRIMARY KEY,
    "fabricName" VARCHAR (80) UNIQUE NOT NULL,
    "fabricComment" VARCHAR (400),
    "fabricLink" VARCHAR (200),
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE
);