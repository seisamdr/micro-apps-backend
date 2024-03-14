import express from "express";
import AuthControllers from "../controllers/AuthControllers";
import UserControllers from "../controllers/UserControllers";
import ArticleControllers from "../controllers/ArticleControllers";
import PartaiControllers from "../controllers/PartaiControllers";
import PaslonControllers from "../controllers/PaslonControllers";
import VoteControllers from "../controllers/VoteControllers";

const Route = express.Router();

// Route Auth
Route.post("/register", AuthControllers.register);
Route.post("/login", AuthControllers.login);

// Route Article
Route.post("/article", ArticleControllers.create);
Route.get("/articles", ArticleControllers.findAll);
Route.get("/article/:id", ArticleControllers.findOne);
Route.patch("/article/:id", ArticleControllers.update);
Route.delete("/article/:id", ArticleControllers.delete);

// Route Partai
Route.post("/admin/partai", PartaiControllers.create);
Route.get("/admin/partais", PartaiControllers.findAll);
Route.get("/admin/partai/:id", PartaiControllers.findOne);
Route.patch("/admin/partai/:id", PartaiControllers.update);
Route.delete("/admin/partai/:id", PartaiControllers.delete);

// Route Paslon
Route.post("/admin/paslon", PaslonControllers.create);
Route.get("/admin/paslons", PaslonControllers.findAll);
Route.get("/admin/paslon/:id", PaslonControllers.findOne);
Route.patch("/admin/paslon/:id", PaslonControllers.update);
Route.delete("/admin/paslon/:id", PaslonControllers.delete);

// Route User
Route.get("/admin/users", UserControllers.findAll);
Route.get("/admin/user/:id", UserControllers.findOne);
Route.patch("/admin/user/:id", UserControllers.update);
Route.delete("/admin/user/:id", UserControllers.delete);

// Route Vote
Route.post("/vote", VoteControllers.create);
Route.get("/votes", VoteControllers.findAll);
Route.get("/vote/:id", VoteControllers.findOne);
Route.patch("/vote/:id", VoteControllers.update);
Route.delete("/vote/:id", VoteControllers.delete);

export default Route;
