# Solución Pregunta 2


## 1. Cookies
Cree una sección que aparezca en la parte inferior de todas las páginas con las siguientes características visuales: 
- Que aparezca un título con un mensaje informando al usuario del uso de cookies. 
- Que tenga un botón de aceptar y otro de rechazar. 
- Que ocupe todo el ancho de la pantalla, tenga el texto y los botones centrados y que esté por encima de cualquier contenido que haya en la página. Tiene que estar  siempre visible. 
- Usa CSS puro para crear esta sección, no uses ningún framework. 
- Puedes encontrar una referencia de cómo tendría que quedar en el anexo 1. 

```html
</body>
<style>
    footer{
        background-color: antiquewhite;
        text-align: center;
        padding: 1% 0%;
        position:fixed;
        width: 100%;
        height: auto;
        bottom:0; 
    }
</style>
<footer id="footer">
    <h1> Uso de Cookies </h1>
    <p> Nos vemos obligados a informarte del uso de cookies necesarias para que funcione la web</p>
    <div id="botones">
        <button id="botonaceptar" onclick="aceptarCookies()"> Aceptar </button>
        <button onclick="location.href=`https://www.google.com`">Rechazar</button>
    </div>
</footer>
<script>
    const footer = document.getElementById('footer');
    function aceptarCookies() {
        footer.style.display = "none";
    }
</script>
</html>
```
## 2. Botón de Cancelar 
Si el usuario le da a cancelar, redirígele a la página de google.es. 
```html
<button onclick="location.href=`https://www.google.com`">Rechazar</button>
```

## 3. Si el usuario acepta las cookies, realice lo siguiente: 
- Cierre el mensaje. 
```javascript
<script>
    const footer = document.getElementById('footer');
    function aceptarCookies() {
        footer.style.display = "none";
    }
</script>
```
- Guarde información en la sesión para que, si sigue visitando otras páginas, no se 
vuelva a mostrar el mensaje. 
```javascript
// Verifica si la preferencia ya se ha guardado en la sesión
        if (sessionStorage.getItem('cookiesAceptadas') === 'true') {
            footer.style.display = 'none';
        }

        function aceptarCookies() {
            // Guarda la preferencia en la sesión
            sessionStorage.setItem('cookiesAceptadas', 'true');
            footer.style.display = 'none';
        }
``` 
- Si el usuario está logeado, guarde en su perfil (en la base de datos) información de 
que ha aceptado las cookies. 

Hay que tener en cuenta antes de empezar que estaba mal lo siguiente en login: 
```javascript
router.post('/', async (req, res) => {
  const user = req.body.user;
  if(await database.user.isLoginRight(user, req.body.pass)){
    req.session.user = user; // ponía {username: name}
    req.session.message = "¡Login correcto!"
    res.redirect("restricted");
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("login");
  }
});
```
Nota: Metemos en cada Get / --> cookie: req.session.AcceptUser

database/models/user.model.js
```javascript
users.acceptCookies = function(username) {
    if(users.data.hasOwnProperty(username)) {
        users.data[username].cookies = true;
        console.log(`Cookies accepted for user: ${username}`)
        return true
    } else {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
}
```
app.js
```javascript
// Database
const database = require('./database');
database.user = require('./database/models/user.model');

app.post('/guardar-cookies', async (req, res, next) => {
  console.log("Entra en guardar cookies");
  req.session.AcceptCookies = true;
  if(req.session.user){
    console.log('Cookies: true')
    try {
      await users.acceptCookies(req.session.user);
    }catch(e){
      console.error(`Error al aceptar cookies: ${e.message}`);
    }
  }else{
    console.log("usuario no logueado")
  }
});
```

views/footer.ejs
```html
<script>
    const footer = document.getElementById('footer');

    // Verifica si la preferencia ya se ha guardado en la sesión
    if (sessionStorage.getItem('cookiesAceptadas') === 'true') {
            footer.style.display = 'none';
        }

        function aceptarCookies() {
            // Guarda la preferencia en la sesión
            sessionStorage.setItem('cookiesAceptadas', 'true');
            footer.style.display = 'none';

            fetch('/guardar-cookies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
        }

</script>
```

## 4. Login, fuera cookies
Cuando un usuario hace login en nuestra página, si en la sesión actual ya ha aceptado 
cookies o en su perfil hemos guardado previamente información de que ha aceptado las 
cookies, no debería mostrarse el mensaje. En caso contrario sí que debería aparecer.

```javascript
users.hasAcceptedCookies = function(username) {
    if (users.data.hasOwnProperty(username)) {
        return users.data[username].cookies === true;
    } else {
        throw new Error(`Usuario ${username} no encontrado.`);
    }
}
```

en app.js:
```javascript
app.get('/check-cookies', async (req, res) => {
  if (req.session.user) {
    try {
      const hasAccepted = users.hasAcceptedCookies(req.session.user);
      res.status(200).send({ cookiesAccepted: hasAccepted });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(401).send({ error: 'Usuario no logueado' });
  }
});
```

En footer.ejs
```javascript
// Verifica si la preferencia ya se ha guardado en la sesión
        fetch('/check-cookie')
            .then(response => response.json())
            .then(data => {
                if (data.cookiesAccepted) {
                    footer.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error al verificar la aceptación de cookies:', error);
            });
```