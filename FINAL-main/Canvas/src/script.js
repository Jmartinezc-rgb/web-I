const c = document.getElementById("myCanvas");
const h = c.getContext("2d");
const o = c.getContext("2d");
const l = c.getContext("2d");
const a = c.getContext("2d");

// fillRect (lado, alto, tamaño lado, tamaño alto)
function hola(){
  //H
    h.fillStyle = "#ffffff";
    h.fillRect(10, 10, 50, 50);
    h.fillRect(10, 70, 50, 50);
    h.fillRect(10, 130, 50, 50);

    h.fillRect(70, 70, 50, 50);

    h.fillRect(130, 10, 50, 50);
    h.fillRect(130, 70, 50, 50);
    h.fillRect(130, 130, 50, 50);
     
    //O
    o.fillStyle = "#000000";
    o.fillRect(200, 10, 50, 50);
    o.fillRect(200, 70, 50, 50);
    o.fillRect(200, 130, 50, 50);

    o.fillRect(260, 10, 50, 50);
    o.fillRect(260, 130, 50, 50);
    
    o.fillRect(320, 10, 50, 50);
    o.fillRect(320, 70, 50, 50);
    o.fillRect(320, 130, 50, 50);

    //L
    o.fillStyle = "#ffffff";
    l.fillRect(390, 10, 50, 50);
    l.fillRect(390, 70, 50, 50);
    l.fillRect(390, 130, 50, 50);

    l.fillRect(450, 130, 50, 50);

    //A
    a.fillStyle= "#000000";
    a.fillRect(520, 10, 50, 50);
    a.fillRect(520, 70, 50, 50);
    a.fillRect(520, 130, 50, 50);

    a.fillRect(640, 10, 50, 50);
    a.fillRect(640, 70, 50, 50);
    a.fillRect(640, 130, 50, 50);

    a.fillRect(580, 10, 50, 50);

    a.fillRect(580, 100, 50, 20);

}

window.onload = hola;

