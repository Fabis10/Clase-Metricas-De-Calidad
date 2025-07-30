import express, { Request, Response } from 'express';

class App {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.routes();
  }
  private routes(): void {
    this.app.get('/', (request: Request, response: Response) => {
      console.log(request);
      response.send("Te extrañaremos para siempre Ozzy");
    });

    this.app.get('/check-health', (request: Request, response: Response) => {
      response.send("I'm Ready");
    });
  }
  getApp():express.Application { 
    return this.app;
  }
}
export default new App().getApp();