import { Application, Request, Response } from "express";
import { FilmController } from "../controllers/filmController";

export class FilmRoutes {
  private filmController: FilmController = new FilmController();

  public route(app: Application) {
    app.post("/api/film", (req: Request, res: Response) => {
      this.filmController.createFilm(req, res);
    });

    app.get("/api/film/:id", (req: Request, res: Response) => {
      this.filmController.getFilm(req, res);
    });

    app.put("/api/film/:id", (req: Request, res: Response) => {
      this.filmController.updateFilm(req, res);
    });

    app.delete("/api/film/:id", (req: Request, res: Response) => {
      this.filmController.deleteFilm(req, res);
    });
  }
}
