# Barça Pedia — Server

## [See the App!](www.your-deploy-url-here.com)

![App Logo](your-image-logo-path-or-name)

## Description

Barça Pedia es una aplicación donde los usuarios pueden explorar jugadores históricos y actuales del FC Barcelona. Los administradores pueden crear, editar y eliminar jugadores, mientras que los usuarios pueden ver información, estadísticas y dejar comentarios.

#### [Client Repo here](www.your-client-repo-url-here.com)  
#### [Server Repo here](www.your-server-repo-url-here.com)

## Backlog Functionalities

- Sistema de likes para comentarios  
- Favoritos para jugadores  
- Búsqueda avanzada por temporadas  
- Perfiles de usuario mejorados  
- Chat o foro entre culés  
- Integración con APIs externas de fútbol  

## Technologies used

Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Cloudinary, Multer, CORS

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ["user", "admin"], default: "user"}
}

## player model
{
  name: {type: String, required: true},
  social: String,
  image: String,
  teamTrophies: [String],
  individualAwards: [String],
  nation: [String],
  description: String,
  goals: {type: Number, default: 0},
  assists: {type: Number, default: 0},
  birthday: Date,
  position: {type: Schema.Types.ObjectId, ref: "Position", required: true}
}

## position model
{
  name: {type: String, required: true}
}

## comment model

{
  text: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref:'User', required: true},
  playerId: {type: Schema.Types.ObjectId, ref:'Player', required: true}
}

| HTTP Method | URL                          | Request Body                | Success status | Error Status | Description                                    |
| ----------- | ---------------------------- | --------------------------- | -------------- | ------------ | ---------------------------------------------- |
| POST        | `/auth/signup`               | {username, email, password} | 201            | 400          | Registers the user in the Database             |
| POST        | `/auth/login`                | {email, password}           | 200            | 400          | Validates credentials, creates and sends Token |
| GET         | `/auth/verify`               |                             | 200            | 401          | Verifies the user Token                        |
| GET         | `/players`                   |                             | 200            | 400          | Shows all players in the DB                    |
| POST        | `/players`                   | Player Object               | 201            | 400          | Creates a new Player (admin only)              |
| GET         | `/players/:playerId`         |                             | 200            | 400, 404     | Sends all player details                       |
| PUT         | `/players/:playerId`         | Player Object               | 200            | 400, 401     | Edits player document (admin only)             |
| DELETE      | `/players/:playerId`         |                             | 200            | 401          | Deletes player document (admin only)           |
| GET         | `/positions`                 |                             | 200            | 400          | Shows all positions                            |
| GET         | `/positions/:positionId`     |                             | 200            | 400, 404     | Shows one position                             |
| GET         | `/comments/player/:playerId` |                             | 200            | 400          | Gets all comments for a specific player        |
| POST        | `/comments`                  | {text, playerId}            | 201            | 400, 401     | Creates a comment (logged users only)          |
| DELETE      | `/comments/:commentId`       |                             | 200            | 401, 403     | Deletes a comment (only author)                |
| POST        | `/upload`                    | (form-data image)           | 200            | 400          | Uploads an image to Cloudinary                 |


## Links
Collaborators

Anton

Mateo

Project

Repository Link Client

Repository Link Server

Deploy Link

Trello

Link to your trello board

Slides

Slides Link
