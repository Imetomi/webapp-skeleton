'use strict';

/**
 * blog-post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
})); 