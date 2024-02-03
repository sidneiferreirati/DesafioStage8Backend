const knex = require("../database/knex");
class TagsController {
  async show(req, res) {
    const tag = await knex("tags");
    return res.json({ tag });
  }
}

module.exports = TagsController;
