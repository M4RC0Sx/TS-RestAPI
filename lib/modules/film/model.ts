import { ModificationNote } from "../common/model";

export interface IFilm {
  _id?: String;
  name: {
    title: String;
    description: String;
  };
  director: String;
  gender: String;
  is_deleted?: Boolean;
  modification_notes: ModificationNote[];
}
