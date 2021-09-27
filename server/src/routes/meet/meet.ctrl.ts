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
