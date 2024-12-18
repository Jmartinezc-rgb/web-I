
/* 
 * Se puede usar fetch para realizar un POST contra nuestro servidor.
 * Cambiar la ruta y la info con lo que queramos enviar.
 * Luego en el servidor podemos usar JSON.parse(req.body)
 * para convertirlo de vuelta a objeto.
 */
fetch('ruta', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "info": info })
})
.then(response => console.log(response));