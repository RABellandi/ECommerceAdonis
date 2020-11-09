'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Image = use('App/Models/Image');
const { manage_single_upload, manage_multiple_uploads } = use('App/Helpers');

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const images = await Image.query()
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.limit);
    return response.send(images);
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      //one upload
      let images = [];
      const fileJar = request.file('images', {
        types: ['images'],
        size: '2mb',
      });
      if (!fileJar.files) {
        const file = await manage_single_upload(fileJar);
        if (file.moved()) {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          });
          images.push(image);
          return response.status(201).send({ successes: images, errors: {} });
        }
        return response.status(400).send({
          message: 'Não foi possível processar a imagem no momento!',
        });
      }
      //
      //multiples uploads
      let files = await manage_multiple_uploads(fileJar);
      await Promise.all(
        files.successes.map(async file => {
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            orignal_name: file.clientName,
            extension: file.subtype,
          });
          images.push(image);
        })
      );
      //return multiples uploads
      return response
        .status(201)
        .send({ successes: images, errors: file.errors });
      //
      //catch whatever errors
    } catch (e) {
      return response.status(400).send({
        message: 'Não foi possível processar a imagem!',
      });
    }
  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ImageController;
