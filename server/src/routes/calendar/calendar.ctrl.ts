import { Request, Response } from "express";
import Calendar from "../../models/calendar";

//일정 생성
export const createSchedule = async (req: Request, res: Response) => {
  const { title, date, start, end } = req.body;
  const userId = res.locals.user._id;
  const startTime = new Date(date.substr(0, 10) + "T" + start);
  const endTime = new Date(date.substr(0, 10) + "T" + end);
  try {
    const schedule = new Calendar({
      title,
      start: startTime,
      end: endTime,
      user: userId,
    });
    await schedule.save();

    return res.status(201).json({
      success: true,
      schedule,
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
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 수정
export const updateSchedule = async (req: Request, res: Response) => {
  const { title, start, end, scheduleId } = req.body;
  const userId = res.locals.user._id;
  try {
    let schedule = await Calendar.findById({ _id: scheduleId });
    if (!schedule) {
      return res.status(400).json({
        success: false,
        message: "해당 일정이 존재하지 않습니다.",
      });
    }
    if (schedule.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "일정 작성자가 아닙니다.",
      });
    }
    schedule = await Calendar.findByIdAndUpdate(
      { _id: scheduleId },
      { title, scheduleId, start, end },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

//일정 삭제
export const deleteSchedule = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { scheduleId } = req.params;
  try {
    let schedule = await Calendar.findById({ _id: scheduleId });
    if (!schedule) {
      return res.status(400).json({
        success: false,
        message: "해당 일정이 존재하지 않습니다.",
      });
    }
    if (schedule.user.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "일정 작성자가 아닙니다.",
      });
    }
    schedule = await Calendar.findByIdAndDelete({ _id: scheduleId });
    const schedules = await Calendar.find().populate("user");
    return res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};
