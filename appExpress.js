const express = require('express')

const app = express();

app.length('/contacto', (req, res) => {
    
    return res.send('bienvenido a la pagina de contacto')
})

function mostrarHoraExacta() {
    var elemento = document.createElement('div');
    elemento.style.fontFamily = 'Arial';
    elemento.style.fontSize = '50px';
    document.body.appendChild(elemento);
  
    setInterval(function() {
      var horaActual = new Date().toLocaleTimeString();
      elemento.innerText = horaActual;
    }, 1000);
    return res.send(mostrarHoraExacta)
  }
  
  // Llamamos a la función para iniciar la visualización de la hora
  mostrarHoraExacta();