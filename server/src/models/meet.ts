import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMeet {
  host: string;
  title: string;
}
export interface IMeetMethod extends IMeet, Document {}
export interface IMeetStatics extends Model<IMeetMethod> {}

const MeetSchema: Schema<IMeetMethod> = new Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Meet = mongoose.model<IMeetMethod, IMeetStatics>("Meet", MeetSchema);

export default Meet;
