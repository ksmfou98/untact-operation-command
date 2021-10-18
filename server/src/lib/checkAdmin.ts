import { NextFunction, Request, Response } from "express";

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "관리자가 아닙니다.",
    });
  }
  return next(); //관리자면 다음 미들웨어 실행
};

export default checkAdmin;

// 이 미들웨어는 관리자가 아니라면 403 HTTP Status를 반환하고 ,
// 그렇지 않으면 그다음 미들웨어를 실행한다.
