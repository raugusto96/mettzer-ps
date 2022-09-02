import { Model, isValidObjectId } from "mongoose";
import IModel from "../interfaces/IModel";
import { IFavorite } from "../interfaces/IUser";

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findOneByEmail(email: string): Promise<T | null> {
    return this._model.findOne({ email });
  }

  public async findOneById(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error("InvalidMongoId");
    return this._model.findOne({ _id }, { __v: 0, password: 0 });
  }

  async addFavorite(_id: string, data: IFavorite): Promise<void> {
    if (!isValidObjectId(_id)) throw Error("InvalidMongoId");
    await this._model.findByIdAndUpdate(
      { _id },
      { $push: { favorites: data } }
    );
  }

  async removeFavorite(_id: string, articleId: string): Promise<void> {
    if (!isValidObjectId(_id)) throw Error("InvalidMongoId");

    await this._model.findByIdAndUpdate(
      { _id },
      { $pull: { favorites: { articleId } } }
    );
  }
}
export default MongoModel;
