import express, { NextFunction, Request, Response } from 'express';
import userRoutes from '../routes/UserRoutes';
import DataNotFoundError from '../shared/errors/DataNotFoundError';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.notFoundRouteMiddleware();
    this.errorHandlerMiddleware();
  }

  private middleware(): void {
    this.app.use(express.json());
  }
  private notFoundRouteMiddleware(): void {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ message: "Ruta no encontrada" });
    });
  }

  private errorHandlerMiddleware(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof DataNotFoundError) {
        return res
          .status(err.statusCode)
          .json({
            message: err.message
          });
      }
      return res
        .status(500)
        .json({ message: "error en el servidor" });
    });
  }
  private routes(): void {
    this.app.use("/api", userRoutes);
  }

  getApp(): express.Application {
    return this.app;
  }
}
export default new App().getApp();