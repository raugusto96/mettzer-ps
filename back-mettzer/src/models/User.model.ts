import { model as mongooseCreateModel, Schema } from "mongoose";
import IUser, { IFavorite } from "../interfaces/IUser";
import MongoModel from "./Generic.model";

const userMongooseSchema = new Schema<IUser>({
  email: String,
  name: String,
  password: String,
  favorites: [
    {
      title: String,
      articleId: String,
      author: String,
    },
  ],
});

class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel("User", userMongooseSchema)) {
    super(model);
  }
}

export default User;
