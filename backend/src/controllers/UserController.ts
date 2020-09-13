import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { checkId } from "../middlewares/checkJwt";
import { User } from "../entity/User";

class UserController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "name", "role"], //We dont want to send the passwords on response
    });

    //Send the users object
    res.send(users);
  };

  static getMe = async (req: Request, res: Response) => {
    let userId = checkId(req);
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(userId, {
        select: [
          "id",
          "name",
          "role",
          "email",
          "register_timestamp",
          "updatedAt",
        ], //We dont want to send the password on response
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "name", "role"], //We dont want to send the password on response
      });
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let {
      name,
      email,
      password,
      role,
      register_timestamp,
      login_timestamp,
    } = req.body;
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;
    user.register_timestamp = register_timestamp;
    user.login_timestamp = login_timestamp;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created");
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { name, role, email } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    user.name = name;
    user.role = role;
    user.email = email;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default UserController;
