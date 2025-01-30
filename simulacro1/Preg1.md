# Solución Preg 1

De momento no tenemos del todo claro cuál va a ser el nombre definitivo de la tienda y ahora mismo lo tenemos hardcodeado en cada ruta. Si quisiéramos cambiar el nombre tendríamos que modificar esos archivos y cualquier futura ruta que creemos. Modifique la aplicación para definir en un único sitio el nombre de la tienda (ahora mismo “Embutidos León”), que este sea accesible en las vistas y elimine el nombre que aparece ahora en las rutas. 

### config.js
```javascript
module.exports = {
    storeName: "Embutidos León"
};
```


### routes/index.js
```javascript
const express = require('express');
const router = express.Router();
const config = require('../config');

// Ruta principal
router.get('/', (req, res) => {
    res.render('index', { storeName: config.storeName });
});

module.exports = router;
