import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICalendar {
  title: string;
  date: Date;
  user:string;
}
export interface ICalendarMethod extends ICalendar, Document {}
export interface ICalendarStatics extends Model<ICalendarMethod> {}

const CalendarSchema: Schema<ICalendarMethod> = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 30,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

const Calendar = mongoose.model<ICalendarMethod, ICalendarStatics>(
  "Calendar",
  CalendarSchema
);

export default Calendar;