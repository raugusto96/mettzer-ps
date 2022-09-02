import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserModel from "../models/User.model";
import UserService from "../services/user.service";
import bodyValidator from "../middlewares/body.middleware";

import {
  favoriteSchema,
  loginSchema,
  registerSchema,
} from "../schemas/user.schema";
import validateToken from "../middlewares/token.middleware";

const route = Router();

const user = new UserModel();
const userService = new UserService(user);
const userController = new UserController(userService);

route.post("/register", bodyValidator(registerSchema), (req, res, next) =>
  userController.create(req, res, next)
);
route.post("/login", bodyValidator(loginSchema), (req, res, next) =>
  userController.login(req, res, next)
);
route.get("/:id", (req, res, next) => userController.findOne(req, res, next));

route.post(
  "/:id/article",
  (req, res, next) => validateToken(req, res, next),
  bodyValidator(favoriteSchema),
  (req, res, next) => userController.addToFavorite(req, res, next)
);

route.delete(
  "/:id/:articleId",
  (req, res, next) => validateToken(req, res, next),
  (req, res, next) => userController.removeToFavorite(req, res, next)
);

export default route;
