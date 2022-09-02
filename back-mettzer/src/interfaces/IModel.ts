import { IFavorite } from "./IUser";

interface IModel<T> {
  create(obj: T): Promise<T>;
  findOneByEmail(email: string): Promise<T | null>;
  findOneById(_id: string): Promise<T | null>;
  addFavorite(_id: string, data: IFavorite): Promise<void>;
  removeFavorite(_id: string, articleId: string): Promise<void>;
}

export default IModel;
