import express from "express";
import UserControllers from "../controllers/UserControllers";
import ArticleControllers from "../controllers/ArticleControllers";
import PartaiControllers from "../controllers/PartaiControllers";
import PaslonControllers from "../controllers/PaslonControllers";

const Route = express.Router();

// Route Article
Route.post("/article", ArticleControllers.create);
Route.get("/articles", ArticleControllers.find);
Route.patch("/article/:id", ArticleControllers.patch);
Route.delete("/article/:id", ArticleControllers.delete);

// Route Partai
Route.post("/partai", PartaiControllers.create);
Route.get("/partais", PartaiControllers.find);
Route.patch("/partai/:id", PartaiControllers.patch);
Route.delete("/partai/:id", PartaiControllers.delete);

// Route Paslon
Route.post("/paslon", PaslonControllers.create);
Route.get("/paslons", PaslonControllers.find);
Route.patch("/paslon/:id", PaslonControllers.patch);
Route.delete("/paslon/:id", PaslonControllers.delete);

// Route User
Route.post("/user", UserControllers.create);
Route.get("/users", UserControllers.find);
Route.patch("/user/:id", UserControllers.patch);
Route.delete("/user/:id", UserControllers.delete);

export default Route;
