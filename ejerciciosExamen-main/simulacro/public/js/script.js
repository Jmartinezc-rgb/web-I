const socket = io();

const aceptar = document.getElementById('aceptar');
const rechazar = document.getElementById('rechazar')
const cookies = document.getElementById('cookies');
const form = document.getElementById('chat');
const messages = document.getElementById('mensajes');

aceptar.addEventListener('click', () => {
    cookies.style.display = 'none';
    const cookiesAceptadas = true;
    fetch('/cookies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cookiesAceptadas })
        });
});
socket.on('chat', (msg) => {
    console.log("Mensaje recibido");
    const item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
});

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(input.value){
        socket.emit('chat', input.value);
        input.value = '';
    }
});
