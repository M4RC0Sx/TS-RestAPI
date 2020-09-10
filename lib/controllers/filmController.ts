import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../modules/common/service";
import { IFilm } from "../modules/film/model";
import FilmService from "../modules/film/service";

export class FilmController {
  private filmService: FilmService = new FilmService();

  public createFilm(req: Request, res: Response) {
    // Check if all fields have been sent in the request.
    if (
      req.body.name &&
      req.body.name.title &&
      req.body.name.description &&
      req.body.director &&
      req.body.gender
    ) {
      const filmParams: IFilm = {
        name: {
          title: req.body.name.title,
          description: req.body.name.description,
        },
        director: req.body.director,
        gender: req.body.gender,
        modification_notes: [
          {
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: "New film created!",
          },
        ],
      };
      this.filmService.createFilm(filmParams, (err: any, filmData: IFilm) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse("Film sucessfully created!", filmData, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public getFilm(req: Request, res: Response) {
    if (req.params.id) {
      const filmFilter = { _id: req.params.id };

      this.filmService.filterFilm(filmFilter, (err: any, filmData: IFilm) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse("Film succesfully retrieved!", filmData, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public updateFilm(req: Request, res: Response) {
    if (
      (req.params.id && req.body.name) ||
      req.body.name.title ||
      req.body.name.description ||
      req.body.director ||
      req.body.gender
    ) {
      const filmFilter = { _id: req.params.id };
      this.filmService.filterFilm(filmFilter, (err: any, filmData: IFilm) => {
        if (err) {
          mongoError(err, res);
        } else if (filmData) {
          filmData.modification_notes.push({
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: "Film data updated!",
          });
          const filmParams: IFilm = {
            _id: req.params.id,
            name: req.body.name
              ? {
                  title: req.body.name.title
                    ? req.body.name.title
                    : filmData.name.title,
                  description: req.body.name.first_name
                    ? req.body.name.description
                    : filmData.name.description,
                }
              : filmData.name,
            director: req.body.director ? req.body.director : filmData.director,
            gender: req.body.gender ? req.body.gender : filmData.gender,
            is_deleted: req.body.is_deleted
              ? req.body.is_deleted
              : filmData.is_deleted,
            modification_notes: filmData.modification_notes,
          };
          this.filmService.updateFilm(filmParams, (err: any) => {
            if (err) {
              mongoError(err, res);
            } else {
              successResponse("Film succesfully updated!", null, res);
            }
          });
        } else {
          failureResponse("Invalid film!", null, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public deleteFilm(req: Request, res: Response) {
    if (req.params.id) {
      this.filmService.deleteFilm(req.params.id, (err: any, deleteDetails) => {
        if (err) {
          mongoError(err, res);
        } else if (deleteDetails.deletedCount !== 0) {
          successResponse("Film succesfully deleted!", null, res);
        } else {
          failureResponse("Invalid film!", null, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }
}
