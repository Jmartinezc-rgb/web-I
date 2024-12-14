# Examen Prueba Sistemas Web I - Parte Práctica


## **Requisitos**
La aplicación debe cumplir los siguientes puntos:

1. **Configurar el puerto del servidor:** La aplicación debe iniciar en el puerto indicado por una variable de entorno o, por defecto, en el puerto 3000.
2. **Panel de administración:** Crear un panel accesible solo para usuarios con rol `admin`, que permita gestionar usuarios.

---

## **Estructura del proyecto**

1. Crea la carpeta principal del proyecto:
    ```bash
    mkdir prueba
    cd prueba
    ```

2. Inicializa el proyecto y configura las dependencias:
    ```bash
    npm init -y
    npm install express ejs body-parser
    ```

3. Estructura final del proyecto:
    ```plaintext
    prueba/
    ├── public/           # Archivos estáticos (CSS, JS, etc.)
    ├── views/            # Plantillas EJS
    ├── app.js            # Archivo principal
    ├── package.json      # Configuración del proyecto
    ```

---

## **Solución por Apartados**

### **Apartado 1: Configurar el puerto**

En el archivo `app.js`, configuramos el puerto de la siguiente forma:

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
```

Esto permite arrancar el servidor con:
```bash
const PORT = process.env.PORT || 3200;
```

---

### **Apartado 2: Panel de Administración**

#### **Paso 1: Crear la plantilla `admin.ejs`**
Crea la plantilla en `views/admin.ejs` con la siguiente estructura:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Admin Panel</title>
</head>
<body>
    <h1>Admin Panel</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <% users.forEach(user => { %>
                <tr>
                    <td><%= user.username %></td>
                    <td><%= user.role %></td>
                    <td><%= user.last_login ? user.last_login : 'Never' %></td>
                    <td>
                        <% if (user.role !== 'admin') { %>
                            <form action="/admin/deleteUser" method="POST">
                                <input type="hidden" name="username" value="<%= user.username %>">
                                <button type="submit">Eliminar</button>
                            </form>
                        <% } %>
                    </td>
                </tr>
            <% }); %>
        </tbody>
    </table>
</body>
</html>
```

#### **Paso 2: Ruta para el panel de administración**
Define la ruta `/admin` en `app.js`:

```javascript
app.get('/admin', (req, res) => {
    if (currentUser && currentUser.role === 'admin') {
        res.render('admin', { users });
    } else {
        res.redirect('/');
    }
});
```
Esto renderiza la plantilla `admin.ejs` si el usuario tiene el rol `admin`.

#### **Paso 3: Enlace en el menú de navegación**
Crea un menú común en `views/header.ejs`:

```html
<nav>
    <% if (currentUser) { %>
        <% if (currentUser.role === 'admin') { %>
            <a href="/admin">Panel de Administración</a>
        <% } %>
        <form action="/logout" method="POST">
            <button type="submit">Cerrar Sesión</button>
        </form>
    <% } else { %>
        <a href="/login">Iniciar Sesión</a>
    <% } %>
</nav>
```
Lo incluyo en cada vista:
```ejs
<%- include('header') %>
```

#### **Paso 4: Actualizar el campo `last_login`**
En la ruta de inicio de sesión (`/login`):

```javascript
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        user.last_login = new Date().toISOString();
        currentUser = user;
        res.redirect('/');
    } else {
        res.send('Credenciales incorrectas');
    }
});
```

#### **Paso 5: Eliminar usuarios**
Agrega un formulario en la tabla de usuarios del panel (ya incluido en `admin.ejs`). Luego, define la ruta para manejar la eliminación:

```javascript
app.post('/admin/deleteUser', (req, res) => {
    const { username } = req.body;

    if (currentUser && currentUser.role === 'admin') {
        users = users.filter(user => user.username !== username);
        res.redirect('/admin');
    } else {
        res.redirect('/');
    }
});
```
Esto elimina al usuario de la lista y redirige al panel de administración.

---

## **Pruebas**
1. Ejecuta el servidor:
    ```bash
    npm start
    ```
2. Abre el navegador y prueba:
    - Visita `http://localhost:3000`.
    - Inicia sesión con:
        - Usuario: `admin`, Contraseña: `admin` (acceso a `/admin`).
        - Usuario: `juan`, Contraseña: `1234` (sin acceso a `/admin`).
    - Prueba la funcionalidad de eliminación de usuarios.

---

## **Notas Adicionales**
- **Gestión de errores:** Agrega validaciones para manejar errores en caso de datos incorrectos o intentos de acceso no autorizado.
- **Mejoras futuras:** Implementar una autenticación más robusta con sesiones o tokens.

