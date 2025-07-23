import express, { Request, Response } from 'express';

//Crear la instancia d expres
const app = express();
//Gestionar rutas/endPoints

app.get('/', (request: Request, response: Response) => {
  console.log(request);
  response.send("Te extrañaremos para siempre Ozzy");
});

app.get('/check-health', (request: Request, response: Response) => {
  response.send("I'm Ready");
});

export default app;