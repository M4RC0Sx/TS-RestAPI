import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: {
      title: String,
      description: String,
    },
  },
  director: String,
  gender: String,
  is_deleted: {
    type: Boolean,
    default: false,
  },
  modification_notes: [ModificationNote],
});

export default mongoose.model("films", schema);
