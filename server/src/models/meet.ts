import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMeet {
  host: string;
  title: string;
  description: string;
  thumbnail: string;
  password: string;
  muted: boolean;
  videoOff: boolean;
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    muted: {
      type: Boolean,
      required: true,
    },
    videoOff: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Meet = mongoose.model<IMeetMethod, IMeetStatics>("Meet", MeetSchema);

export default Meet;
