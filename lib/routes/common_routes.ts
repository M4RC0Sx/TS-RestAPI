import { Application, Request, Response } from "express";

export class CommonRoutes {
  public route(app: Application) {
    // ALL methods request.
    app.get("*", (req: Request, res: Response) => {
      res.status(404).json({ error: true, message: "URL not found!" });
    });
  }
}
