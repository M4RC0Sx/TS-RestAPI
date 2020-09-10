import { Application, Request, Response } from "express";

export class TestRoutes {
  public route(app: Application) {
    // GET request.
    app.get("/api/test", (req: Request, res: Response) => {
      res.status(200).json({ message: "GET successful!" });
    });

    // POST request.
    app.post("/api/test", (req: Request, res: Response) => {
      res.status(200).json({ message: "GET successful!" });
    });
  }
}
