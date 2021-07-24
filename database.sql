CREATE DATABASE todo_database;

CREATE TABLE users (
    user_id UUID NOT NULL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)

CREATE TABLE posts (
    post_id UUID NOT NULL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(user_id)
)