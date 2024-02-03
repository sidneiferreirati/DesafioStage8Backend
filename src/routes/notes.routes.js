const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const noteRoutes = Router();
const notesController = new NotesController();

noteRoutes.post("/:user_id", notesController.create);
noteRoutes.delete("/:id", notesController.delete);
noteRoutes.get("/", notesController.show);

module.exports = noteRoutes;
