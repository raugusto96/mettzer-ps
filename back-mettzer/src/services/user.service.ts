import IService from "../interfaces/IService";
import IUser, { IFavorite } from "../interfaces/IUser";
import IModel from "../interfaces/IModel";
import { ErrorHandler } from "../utils/Error.class";

import JWT from "../utils/jwt.class";

class UserService implements IService<IUser> {
  private _model: IModel<IUser>;
  private _jwt: JWT = new JWT();
  constructor(model: IModel<IUser>) {
    this._model = model;
  }

  async create(obj: IUser): Promise<void> {
    const userExists = await this._model.findOneByEmail(obj.email);
    if (userExists) throw new ErrorHandler(409, "User already exists");
    await this._model.create({
      ...obj,
      favorites: [],
    });
  }

  async login(obj: any): Promise<any | null> {
    const userExists = await this.findOneByEmail(obj.email);
    
    if (userExists.password !== obj.password) {
      throw new ErrorHandler(409, "Email or password is incorrect");
    }
    const token = this._jwt.generateToken({
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
    });

    return {
      token,
      name: userExists.name,
      id: userExists.id,
    };
  }

  async findOneByEmail(email: string): Promise<IUser> {
    const user = await this._model.findOneByEmail(email);
    if (!user) throw new ErrorHandler(409, "Email or password is incorrect");
    return user;
  }

  async findOneById(_id: string) {
    const user = await this._model.findOneById(_id);
    if (!user) throw new ErrorHandler(409, "Not found user with this id");
    return user;
  }

  async addFavorite(_id: string, data: IFavorite): Promise<string | null> {
    await this._model.addFavorite(_id, data);
    return "Article added to favorite with success";
  }

  async removeFavorite(_id: string, articleId: string): Promise<string | null> {
    await this._model.removeFavorite(_id, articleId);
    return "Article deleted to favorite with success";
  }
}

export default UserService;
