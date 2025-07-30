import http from 'http';
import express from 'express';

export default class ServerBootstrap {
  //Atributos, propiedades o caracteristicas
  private app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  init() {
    const server = http.createServer(this.app);
    const PORT = process.env.PORT || 4666;

    server.listen(PORT, () => {
      console.log(`El servidor se ha iniciado en http://localhost:${PORT}`)
    })
  }

}