import express, { Request, Response } from 'express';
import userRoutes from '../routes/UserRoutes';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api", userRoutes);
  }
  getApp(): express.Application {
    return this.app;
  }
}
export default new App().getApp();