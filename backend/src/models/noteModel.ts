import mongoose, {
  Document,
  InferSchemaType,
  model,
  Schema,
  Types,
} from "mongoose";

import Inc from "mongoose-sequence";
//it looks like the typing for mongoose sequence isn't right
//the typing says the exported function expects a schema as its arg while docs says you should pass a mongoose instance
//likewise, it says Inc function returns void and so its value can't be used after i.e AutoIncrement
//so, ignore TS errors
// @ts-expect-error
const AutoIncrement = Inc(mongoose);

export interface INoteFile {
  path: string;
  filename: string;
  mimetype: string;
  size: number;
  destination?: string;
}

//document interface//extending doc adds active record methods for modifying the document
export interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  content: string | undefined;
  deadline: string;
  files: INoteFile[];
  noteId: number;
}

//schema definition//properties must be defined in document interface above//vice versa is not true
const noteSchema = new Schema<INote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    deadline: {
      type: String,
    },
    files: {
      type: [Object], //don't support object types//use Object, {}, Schema.Types.Mixed, mongoose.Mixed
    },
  },
  {
    timestamps: true,
  }
);
// @ts-expect-error
noteSchema.plugin(AutoIncrement, {
  inc_field: "noteId",
  id: "noteNums",
  start_seq: 500,
});
//you can do automatic type inference//do not account for noteId//only what is defined in schema//+ other issues with timestamps/not good
// type Note = InferSchemaType<typeof noteSchema>;
// export default mongoose.model<Note>("Note", noteSchema);

export default model<INote>("Note", noteSchema);
