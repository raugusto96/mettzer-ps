import { NextFunction, Request, Response } from "express";
import IService from "../interfaces/IService";
import IUser from "../interfaces/IUser";

export default class FrameController {
  constructor(private _service: IService<IUser>) {}

  public async create(
    req: Request & { body: IUser },
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, email, password } = req.body;
      const user = { name, email, password, score: 0 };
      await this._service.create(user);
      return res.status(201).json({ message: "User created succesfuly" });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = { email, password } as IUser;
      const response = await this._service.login(user);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._service.findOneById(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async addToFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, title, articleId } = req.body;
      const message = await this._service.addFavorite(req.params.id, {
        author,
        title,
        articleId,
      });
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  public async removeToFavorite(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const message = await this._service.removeFavorite(
        req.params.id,
        req.params.articleId
      );
      return res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
}
