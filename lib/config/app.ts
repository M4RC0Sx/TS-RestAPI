import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import env from "../env";

import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";
import { FilmRoutes } from "../routes/film_routes";

class App {
  public app: express.Application;

  public mongoRoute: string = "mongodb://172.17.0.2/" + env.getDB();

  private testRoutes: TestRoutes = new TestRoutes();
  private filmRoutes: FilmRoutes = new FilmRoutes();
  private commonRoutes: CommonRoutes = new CommonRoutes();

  constructor() {
    this.app = express(); // Express App instance.
    this.mainSetup(); // Main configuration.

    this.mongoSetup(); // MongoDB setup.

    this.testRoutes.route(this.app); // Test routes.
    this.filmRoutes.route(this.app); // Film routes.
    // Common routes always at the end of all routes!!
    this.commonRoutes.route(this.app); // All default routes.
  }

  private mainSetup(): void {
    // JSON POST data support.
    this.app.use(bodyParser.json());

    // x-www-form-urlencoded POST data support.
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    console.log("Attemping MongoDB connection...");

    mongoose.connect(this.mongoRoute, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", function () {
      console.log("MongoDB connection established!");
    });
  }
}

export default new App().app;
