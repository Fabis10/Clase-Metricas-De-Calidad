import express from 'express';
import http from 'http';
//Crear la instancia d expres
const app = express();
/**
 * Iniciar un servidor en puerto 4666
 * 
*/

const PORT: number = 4600;
const server = http.createServer(app);
// server.listen(4666/*Puerto*/, function () {

// }/*Funcion anonima*/);
server.listen(PORT/*Puerto*/, /*Funcion anonima tipo flecha*/(): void => {
  console.log(`Server on http://localhost:${PORT}`);
});