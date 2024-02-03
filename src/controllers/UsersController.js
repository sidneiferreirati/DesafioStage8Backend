const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");
class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userEmailExist = await knex("users").where("email", email).first();
    if (userEmailExist?.email == email) {
      throw new AppError("Este email já esta cadastrado no banco de dados");
    }

    const hashPasssword = await hash(password, 8);
    await knex("users").insert({ name, email, password: hashPasssword });

    return res.status(201).json();
  }

  async update(req, res) {
    let { name, email, password, oldPassword } = req.body;
    const { id } = req.params;
    const user = await knex("users").where("id", id).first();
    if (user == undefined) {
      throw new AppError("Usuario não encontrado");
    }
    if (!oldPassword) {
      throw new AppError("Digite a senha antiga");
    }
    const veriryPass = await compare(oldPassword, user.password); // Não esta funcionando a validação
    if (!veriryPass) {
      throw new AppError("Senha antiga não confere");
    }
    name = name ?? user.name;
    email = email ?? user.email;
    password = await hash(password, 8);

    await knex("users").update({ name, email, password }).where("id", id);
    return res.json();
  }
}

module.exports = UsersController;
