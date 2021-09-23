import { Request, Response } from "express";
import Calendar from "../../models/calendar";

//일정 생성
export const createSchedule = async (req: Request, res: Response) => {
  const { title, start, end } = req.body;
  const userId = res.locals.user._id;
  try {
    const schedules = await Calendar.find();
    const schedule = new Calendar({ title, start, end, userId });
    await schedule.save();

    return res.status(201).json({
      success: true,
      schedules: schedules.concat(schedule),
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 조회
export const readSchedule = async (req: Request, res: Response) => {
  try {
    const schedules = await Calendar.find().populate("user");
    return res.status(200).json({
      success: true,
      schedules: [...schedules.reverse()],
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 수정
