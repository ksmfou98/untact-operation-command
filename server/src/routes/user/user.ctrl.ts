import { Request, Response } from "express";
import multer from "multer";
import User from "../../models/user";

// multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
var upload = multer({ storage: storage }).single("user_img");

export const uploadImg = (req: Request, res: Response) => {
  upload(req, res, (err) => {
    console.log("req.body");
    if (err) {
      return res.json({ success: false, err });
    }
    console.log("asd2");
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

//회원가입
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    //이메일이 존재할 경우 실패 메세지전송
    const exist = await User.findByEmail(email);
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "email is exist",
      });
    }

    // 유저 생성
    const user = new User({ email, name });
    await user.setPassword(password); //패스워드를 암호화 시킴
    await user.save(); //데이터베이스에 저장

    const token = await user.generateToken(); //토큰 생성 (토큰이 있으면 로그인 된 상태)
    const data = user.serialize(); // 응답할 데이터에서 password 필드 제거

    //성공시 전송
    res.cookie("user", token).status(201).json({
      success: true,
      user: data,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// 로그인
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // email , password 가 안들어왔으면 실패처리
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "정보가 입력되지 않았습니다 !",
    });
  }

  try {
    // 이메일이 존재하는지 확인
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "계정이 존재하지 않습니다 !",
      });
    }

    //비밀번호가 맞는지 확인
    const valid = await user.checkPassword(password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "잘못된 비밀번호 입니다",
      });
    }

    const token = await user.generateToken();
    const data = user.serialize();

    res.cookie("user", token).status(200).json({
      success: true,
      user: data,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

// 로그아웃
export const logout = async (req: Request, res: Response) => {
  res.cookie("user", "").status(200).json({
    success: true,
    message: "로그아웃 성공!",
  });
};

//친구 추가
export const addFriend = async (req: Request, res: Response) => {
  const { friendId } = req.body;
  try {
    let me = await User.findOne({ _id: res.locals.user._id });
    let friend = await User.findOne({ _id: friendId });

    const exist = me.friends.some((f) => f.toString() === friendId);
    const myself = res.locals.user._id === friendId;

    //자기 자신을 추가 하는지 확인
    if (myself) {
      return res.status(409).json({
        success: false,
        message: "자신을 친구로 추가할 수 없습니다.",
      });
    }

    //중복 친구추가를 하는지 확인
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "이미 친구입니다.",
      });
    }

    //내 친구목록에 친구를 추가
    me.friends.push(friendId);
    await me.save();

    //친구의 친구목록에 나를 추가
    friend.friends.push(res.locals.user._id);
    await friend.save();

    const myfriends = me.friends;

    return res.status(200).json({
      success: true,
      myfriends,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

//친구 삭제
export const deleteFriend = async (req: Request, res: Response) => {
  const { friendId } = req.params;

  try {
    let me = await User.findOne({ _id: res.locals.user._id });
    let friend = await User.findOne({ _id: friendId });

    //삭제할 친구의 id를 배열에서 삭제
    console.log(friendId);

    me.friends = me.friends.filter((f) => f.toString() !== friendId);
    await me.save();
    console.log(me.friends, "ASd");

    //친구한테도 동일하게 적용
    friend.friends = friend.friends.filter(
      (f) => f.toString() !== res.locals.user._id
    );
    await friend.save();
    const myFriends = me.friends;

    return res.status(200).json({
      success: true,
      myFriends,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

//친구 목록 불러오기
export const readFriendList = async (req: Request, res: Response) => {
  try {
    const me = await User.findOne({ _id: res.locals.user._id }).populate(
      "friends"
    );

    //내 친구목록을 return
    const myFriends = me.friends;
    return res.status(200).json({
      success: true,
      myFriends,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};

//친구를 email 검색하여 찾기
export const searchFriendEmail = async (req: Request, res: Response) => {
  const { friendEmail } = req.params;
  try {
    const members = await User.find({ email: friendEmail });
    return res.status(200).json({
      success: true,
      members,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
};
