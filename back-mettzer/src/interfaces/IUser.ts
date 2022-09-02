export type IFavorite = {
  author: string;
  title: string;
  articleId: string;
};

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  favorites?: IFavorite[];
}

export default IUser;
