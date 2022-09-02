import { IFavorite } from "./IUser";

interface IService<T> {
  create(obj: T): void;
  login(obj: T): Promise<any | null>;
  findOneByEmail(email: string): Promise<T | null>;
  findOneById(_id: string): Promise<T | null>;
  // findAll(): Promise<T[] | null>;
  // updateScore(_id: string, score: number): Promise<void>;
  addFavorite(_id: string, data: IFavorite): Promise<string | null>;
  removeFavorite(_id: string, articleId: string): Promise<string | null>;
}

export default IService;
