import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../config/secret";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  newUser.save((err, user) => {
    if (err) res.status(502).send({ message: "Erro", err });
    res.status(200).send({ message: "Utilizador criado com sucesso" });
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Email and Password cannot be empty" });
  }

  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.status(204).send({ message: "User Not Registered" });
  }

  const userRes = { id: user._id, name: user.name, email: user.email };

  bcrypt.compare(req.body.password, user.password).then((match) => {
    if (!match) {
      return res
        .status(400)
        .json({ error: "Wrong Email and Password Combination!" });
    }
    const accessToken = jwt.sign(
      { email: user.email, name: user.name, id: user._id },
      secret
    );
    res
      .status(200)
      .send({ message: "Logged In", user: userRes, token: accessToken });
  });
};

export default { signup, login };
