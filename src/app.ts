import express from 'express';
import cors from 'cors';
import router from './routes/_index';
import * as dotenv from 'dotenv';

class App {
  public express: express.Application;

  public constructor() {
    dotenv.config();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(router);
  }
}

export default new App().express;