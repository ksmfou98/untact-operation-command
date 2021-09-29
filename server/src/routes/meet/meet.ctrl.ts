import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import Meet from "../../models/meet";

// 미팅 생성
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

// 미팅 썸네일 이미지 저장

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/meet_thumb/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("meetThumb_img");

export const uploadMeetThumb = async (req: Request, res: Response) => {
  const dir = "./uploads/meet_thumb";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  upload(req, res, (err) => {
    // 프론트랑 연동하고 try catch로 변경
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

// 미팅 목록 조회
export const readMeetList = async (req: Request, res: Response) => {
  try {
    const meets = await Meet.find().populate("host");

    return res.status(200).json({
      success: true,
      meets: [...meets.reverse()],
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      e,
    });
  }
};
