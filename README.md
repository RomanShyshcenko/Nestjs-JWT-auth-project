# About the Project
This is my first project using **NestJS** and **TypeScript**. Here, I created a basic API for the authentication and
to understand how to create a web API.
In this project exists only `USER`,  `ROLE` models and `USER-ROLES` model for many-to-many relationship.
For ORM, I used **Sequelize ORM**, for validation **class-validator** and **class-transformer**, for authentication **JWT** (`@nestjs/jwt`), and for API documentation **Swagger**.

## Project Setup
Let's run the app using **Docker Compose**.

### 🚀 Quick Start

```bash
# Clone the project from GitHub
git clone https://github.com/RomanShyshcenko/Nestjs-JWT-auth-project.git

# Move to the directory with docker-compose.yml
cd Nestjs-JWT-auth-project/

# Start the app
docker compose up -d

# Stop the app
docker compose down
```

### 📌 API Documentation
You can access the API documentation at:  
➡️ [http://localhost:5000/api/docs/](http://localhost:5000/api/docs/)

### ⚠️ Important Note
After the server successfully starts, you **must** create the `"USER"` role via the roles endpoint.

This is necessary because when a new user is created, they are automatically assigned the `"USER"` role.  
If the `"USER"` role does not exist, an error will occur.  