import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user";
import config from "../../config/index";
import auth from "../../middleware/auth";

const { JWT_SECRET } = config;
const router = express.Router();

//get실행 시 유저정보 모두 불러오는 api
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) throw Error("No users");
    res.status(200).json(user);
    console.log(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ errMsg: e.message });
  }
});

router.post("/", (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ errMsg: "필수필드입력" });
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ errMsg: "이미 존재" });
    }
    const newUser = new User({ name, email, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

router.post("/:userName/profile", auth, async (req, res) => {
  try {
    const { previousPassword, password, rePassword, userId } = req.body;
    console.log(req.body, "userName Profile");
    const result = await User.findById(userId, "password");

    bcrypt.compare(previousPassword, result.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          match_msg: "기존 비밀번호와 일치하지 않습니다",
        });
      } else {
        if (password === rePassword) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              result.password = hash;
              result.save();
            });
          });
          res
            .status(200)
            .json({ success_msg: "비밀번호 업데이트에 성공했습니다" });
        } else {
          res
            .status(400)
            .json({ fail_msg: "새로운 비밀번호가 일치하지 않습니다" });
        }
      }
    });
  } catch (e) {
    console.log(e, "password err");
  }
});

export default router;
//
