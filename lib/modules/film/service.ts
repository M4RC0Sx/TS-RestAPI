import { IFilm } from "./model";
import films from "./schema";

export default class FilmService {
  public createFilm(filmParams: IFilm, callback: any) {
    const _session = new films(filmParams);
    _session.save(callback);
  }

  public filterFilm(query: any, callback: any) {
    films.findOne(query, callback);
  }

  public updateFilm(filmParams: IFilm, callback: any) {
    const query = { _id: filmParams._id };
    films.findOneAndUpdate(query, filmParams, callback);
  }

  public deleteFilm(_id: String, callback: any) {
    const query = { _id: _id };
    films.deleteOne(query, callback);
  }
}
