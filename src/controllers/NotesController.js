const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
  async create(req, res) {
    const { title, description, rating, tag } = req.body;
    const { user_id } = req.params;

    const user = await knex("users").where("id", user_id).first();

    if (!user) {
      throw new AppError("usuario não encontrado");
    }

    const [note] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const name = tag;
    const note_id = note;
    await knex("tags").insert({ note_id, user_id, name });
    return res.json();
  }
  async show(req, res) {
    const notes = await knex("notes");
    return res.json(notes);
  }
  async delete(req, res) {
    const { id } = req.params;
    const note = await knex("notes").where({ id }).first();

    if (!note) {
      throw new AppError("Nota não encontrada");
    }
    await knex("notes").where({ id }).delete();
    return res.json();
  }
}

module.exports = NotesController;
