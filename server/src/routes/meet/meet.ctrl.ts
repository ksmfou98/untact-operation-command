import { Request, Response } from "express";
import Meet from "../../models/meet";

export const createMeet = async (req: Request, res: Response) => {
  try {
    const meet = new Meet(req.body);
    await meet.save();

    return res.status(201).json({
      success: true,
      meet,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      e,
    });
  }
};

export const readMeetList = async (req: Request, res: Response) => {
  try {
    const meets = await Meet.find();

    return res.status(200).json({
      success: true,
      meets,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      e,
    });
  }
};
