import http from 'http';
import express from 'express';

export default class ServerBootstrap {
  //Atributos, propiedades o caracteristicas
  private app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      const PORT = process.env.PORT || 4666;

      server.listen(PORT)
        .on('listening', () => {
          console.log(`El servidor empezo en el puerto ${PORT}`);
          resolve(true);
        })
        .on('error', (err) => {
          console.error(`Error iniciando el server ${err}`);
          reject(false);
        });
    });
  }

}