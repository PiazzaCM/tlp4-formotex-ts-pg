import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import morgan from "morgan";
import { PORT } from "./config/conf";
import { connectDB } from "./db/connection";
import { AuthRouter } from "./routes/user.routes";
import { ProductRouter } from "./routes/product.routes";
import { OrganizationRouter } from "./routes/organization.routes";


class Server {
  app: Express;
  port: number;

  constructor() {
    this.app = express();
    this.port = PORT;

    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  private async dbConnect(): Promise<void> {
    await connectDB();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api", AuthRouter);
    this.app.use("/api", ProductRouter);
    this.app.use("/api", OrganizationRouter);
  }

  public listen(): void {
    this.app.listen(this.port, () =>
      console.log(`Server on http://127.0.0.1:${this.port}`)
    );
  }
}

export default Server;
