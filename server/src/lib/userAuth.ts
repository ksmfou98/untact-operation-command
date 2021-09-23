import { NextFunction, Request, Response } from "express";
var jwt = require("jsonwebtoken"); // import로 하면 decoded의 타입 오류가 생김  https://stackoverflow.com/questions/47508424/how-to-get-token-expiration-with-jsonwebtoken-using-typescript 참고

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.user;

  if (!token) return next(); // 토큰이 없을 때
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "untact-operation-command"
    );
    res.locals.user = {
      // res.locals는 전역변수를 만드는 것임 그러므로 다른곳에서 user를 사용할 수 있음
      _id: decoded._id,
      email: decoded.email,
      name: decoded.name,
    };
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default userAuth;
