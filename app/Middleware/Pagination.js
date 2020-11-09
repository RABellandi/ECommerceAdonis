'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/lucid/src/Lucid/QueryBuilder/index.js')} QueryBuilder */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // call next to advance the request
    if (ctx.request.method() === 'GET') {
      let page = parseInt(ctx.request.input('page'));
      if (!page) {
        page = 1;
      }
      let limit = parseInt(ctx.request.input('limit'));
      if (!limit) {
        limit = 20;
      }
      ctx.pagination = { page, limit };
      const perpage = parseInt(ctx.request.input('perpage'));
      if (perpage) {
        ctx.pagination.limit = perpage;
      }
    }
    await next();
  }
}

module.exports = Pagination;
