'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

  const User = use("App/Models/User")


/**
 * Resourceful controller for interacting with users
 */
class UserController {
   /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, pagination }) {
    const name = request.input('name');
    const query = User.query();
    if (name) {
      query.where('name', 'LIKE', `%${name}%`);
      query.onWhere('email', 'LIKE', `%${name}%`);
      query.onWhere('surname', 'LIKE', `%${name}%`);
    }
    const users = await query.paginate(pagination.page , pagination.limit);
    return response.send(users);
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const { name, surname, email, password, image_id } = request.all();
      const user = await User.create({ name, surname, email, password, image_id });
      return response.status(201).send(user);
    } catch (e) {
      return reponse.status(400).send({
        message: 'Erro ao processar a sua solicitação!',
      });
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);
    return response.send(user);
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);
    try{
    const { name, surname, email, image_id } = request.all();
    user.merge({name, surname, email, image_id});
    await user.save();
    return response.status(201).send(user);
    } catch (e) {
      return response.status(400).send({message: "Não foi possível atualizar!"})
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const user = await User.findOrFail(id);
    try {
    user.delete();
    return response.status(204).send();
    } catch (e) {
      return response.status(500).send({message: "Não foi possível deletar!"})
    }
  }
}

module.exports = UserController
