# About project
It's my first project with nestjs and typescript. Here I created some basic API with USER and ROLE models. For 
ORM I 
was using **SequilizeOrm** for validation **class-validator** and **class-transformer**, for auth use JWT
(**nestjs/jwt**) and API documentation **swagger**

## Description
It's basic nestjs auth app that I make for basic understanding of how to create web api in Node.js. 

## Project setup
Lets run our app with docker compose.
```bash
# Clone project from github.
git clone https://github.com/RomanShyshcenko/Nestjs-JWT-auth-project.git
 
# Start app
$ docker compose up -d

# Stop app
$ docker compose down
```
After server successfully runs for first you should create the "USER" role at roles endpoint. Reason for this is that 
after 
user creation we gave to him base role "USER" and if you won't create "USER" role it'll give an error.
