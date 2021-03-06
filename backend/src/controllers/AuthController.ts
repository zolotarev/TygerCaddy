import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if username and password are set
    if (!(email && password)) {
      console.error('Empty email or password!');
      return res.status(400).send({
        error: 'Empty email or password'
      });
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      console.error('Cant find user from DB!');
      return res.status(401).send({
        error: 'Cant find user from DB'
      });
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      console.error('Cannot match encrypted password!');
      return res.status(401).send({
        error: 'Cannot match encrypted password'
      });
    }
    let data = {
      token: ""
    };

    // Sing JWT, valid for 1 hour
    data.token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    // Send the jwt in the response
    return res.send(data);
  };

  static changePassword = async (req: Request, res: Response) => {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      return res.status(400).send();
    }

    // Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      return res.status(401).send();
    }

    // Check if old password matches
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      return res.status(401).send();
    }

    // Validate the model (Password length)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    // Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    return res.status(204).send();
  };
}

export default AuthController;