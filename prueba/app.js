const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de motor de plantillas y middlewares
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Usuarios de prueba
let users = [
    { username: 'admin', password: 'admin', role: 'admin', last_login: null },
    { username: 'juan', password: '1234', role: 'user', last_login: null },
    { username: 'ana', password: '1234', role: 'user', last_login: null },
    { username: 'rodrigo', password: '1234', role: 'user', last_login: null },
    { username: 'maria', password: '1234', role: 'user', last_login: null },
];

// Simular usuario actual (esto debería ser reemplazado con autenticación real)
let currentUser = null;

// Middleware para pasar datos a las vistas
app.use((req, res, next) => {
    res.locals.currentUser = currentUser;
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { users });
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

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

// Logout
app.post('/logout', (req, res) => {
    currentUser = null;
    res.redirect('/');
});

// Panel de administración
app.get('/admin', (req, res) => {
    if (currentUser && currentUser.role === 'admin') {
        res.render('admin', { users });
    } else {
        res.redirect('/');
    }
});

// Eliminar usuario
app.post('/admin/deleteUser', (req, res) => {
    const { username } = req.body;

    if (currentUser && currentUser.role === 'admin') {
        users = users.filter(user => user.username !== username);
        res.redirect('/admin');
    } else {
        res.redirect('/');
    }
});

