# Tutorial: Manejo de "Base de Datos" JSON en Node.js con Express

En este tutorial crearemos una aplicación que simula el manejo de una base de datos utilizando un archivo JSON como almacenamiento. También implementaremos un sistema de login básico utilizando vistas renderizadas con EJS.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (versión 14 o superior).

## Paso 1: Inicializa el proyecto

1. Crea un directorio para tu proyecto:
   ```bash
   mkdir ejercicio-json-db
   cd ejercicio-json-db
   ```

2. Inicializa un proyecto Node.js:
   ```bash
   npm init -y
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install express fs ejs
   ```

4. Crea la estructura de carpetas:
   ```bash
   mkdir database public public/stylesheets routes views
   ```

## Paso 2: Crea la "base de datos" JSON

1. Dentro de la carpeta `database`, crea un archivo llamado `db.json` con el siguiente contenido:
   ```json
   {
       "users": [
           { "id": 1, "username": "user1", "password": "pass1" },
           { "id": 2, "username": "user2", "password": "pass2" },
           { "id": 3, "username": "user3", "password": "pass3" },
           { "id": 4, "username": "user4", "password": "pass4" },
           { "id": 5, "username": "user5", "password": "pass5" }
       ]
   }
   ```

Este archivo simulará nuestra base de datos.

## Paso 3: Configura el servidor Express

1. En el archivo `app.js`, escribe el siguiente código:
   ```javascript
   const express = require('express');
   const fs = require('fs');
   const path = require('path');
   const app = express();

   // Configuración
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use(express.static(path.join(__dirname, 'public')));
   app.set('view engine', 'ejs');

   // Leer la "base de datos"
   const readDatabase = () => {
       const data = fs.readFileSync('./database/db.json', 'utf-8');
       return JSON.parse(data);
   };

   // Escribir en la "base de datos"
   const writeDatabase = (data) => {
       fs.writeFileSync('./database/db.json', JSON.stringify(data, null, 2));
   };

   // Rutas
   app.get('/', (req, res) => {
       res.render('index');
   });

   app.get('/login', (req, res) => {
       res.render('login');
   });

   app.post('/login', (req, res) => {
       const { username, password } = req.body;
       const db = readDatabase();

       const user = db.users.find(u => u.username === username && u.password === password);

       if (user) {
           res.render('welcome', { username });
       } else {
           res.render('login', { error: 'Credenciales inválidas' });
       }
   });

   app.listen(3000, () => {
       console.log('Servidor corriendo en http://localhost:3000');
   });
   ```

## Paso 4: Crea las vistas con EJS

1. Dentro de la carpeta `views`, crea un archivo llamado `index.ejs`:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Inicio</title>
       <link rel="stylesheet" href="/stylesheets/main.css">
   </head>
   <body>
       <h1>Bienvenido a la Aplicación</h1>
       <a href="/login">Iniciar Sesión</a>
   </body>
   </html>
   ```

2. Crea un archivo llamado `login.ejs`:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Login</title>
       <link rel="stylesheet" href="/stylesheets/main.css">
   </head>
   <body>
       <h1>Inicio de Sesión</h1>
       <% if (typeof error !== 'undefined') { %>
           <p style="color: red;"><%= error %></p>
       <% } %>
       <form action="/login" method="POST">
           <label for="username">Usuario:</label>
           <input type="text" id="username" name="username" required>
           <br>
           <label for="password">Contraseña:</label>
           <input type="password" id="password" name="password" required>
           <br>
           <button type="submit">Ingresar</button>
       </form>
   </body>
   </html>
   ```

3. Crea un archivo llamado `welcome.ejs`:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Bienvenido</title>
       <link rel="stylesheet" href="/stylesheets/main.css">
   </head>
   <body>
       <h1>¡Bienvenido, <%= username %>!</h1>
       <a href="/">Cerrar Sesión</a>
   </body>
   </html>
   ```

4. Dentro de la carpeta `public/stylesheets`, crea un archivo llamado `main.css`:
   ```css
   body {
       font-family: Arial, sans-serif;
       margin: 0;
       padding: 0;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       height: 100vh;
       background-color: #f5f5f5;
   }

   h1 {
       color: #333;
   }

   a {
       color: #007bff;
       text-decoration: none;
   }

   a:hover {
       text-decoration: underline;
   }

   form {
       display: flex;
       flex-direction: column;
       align-items: flex-start;
   }

   label {
       margin-top: 10px;
   }

   button {
       margin-top: 10px;
       padding: 5px 10px;
       background-color: #007bff;
       color: white;
       border: none;
       border-radius: 3px;
       cursor: pointer;
   }

   button:hover {
       background-color: #0056b3;
   }
   ```

## Paso 5: Ejecuta la aplicación

1. En la terminal, inicia el servidor:
   ```bash
   node app.js
   ```

2. Abre un navegador y ve a `http://localhost:3000`. Intenta iniciar sesión con las credenciales del archivo `db.json`.
