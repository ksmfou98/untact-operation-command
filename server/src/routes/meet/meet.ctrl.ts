import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import Meet from "../../models/meet";

// 회의 생성
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

// 회의 썸네일 이미지 저장

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

// 회의 목록 조회
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

// 회의 조회
export const findMeet = async (req: Request, res: Response) => {
  const { meetId } = req.params;
  try {
    const meet = await Meet.findById(meetId).populate("host");
    if (!meet) {
      return res.status(200).json({
        exist: false,
        message: "회의가 존재하지 않습니다.",
      });
    }

    return res.status(200).json({
      exist: true,
      meet,
      message: "회의 조회 성공",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      e,
    });
  }
};

// 회의 비밀번호 체크
export const meetPasswordCheck = async (req: Request, res: Response) => {
  const { meetId, password } = req.body;
  try {
    const meet = await Meet.findById(meetId);
    if (!meet) {
      return res.status(404).json({
        success: false,
        message: "회의가 존재하지 않습니다.",
      });
    }

    if (meet.password !== password) {
      return res.status(400).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }

    return res.status(200).json({
      message: "회의 비밀번호 체크 성공",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      e,
    });
  }
};

// 회의 검색

export const searchMeet = async (req: Request, res: Response) => {
  const { keyword } = req.params;

  try {
    const meets = await Meet.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

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
