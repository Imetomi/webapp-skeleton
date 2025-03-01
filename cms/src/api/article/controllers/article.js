'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    // Add populate to get related data
    ctx.query = {
      ...ctx.query,
      populate: {
        featuredImage: true,
        author: {
          populate: ['profilePicture']
        },
        categories: true,
        tags: true,
        seo: {
          populate: ['ogImage', 'twitterImage']
        }
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  
  async findOne(ctx) {
    // Add populate to get related data
    ctx.query = {
      ...ctx.query,
      populate: {
        featuredImage: true,
        author: {
          populate: ['profilePicture', 'socialLinks']
        },
        categories: true,
        tags: true,
        seo: {
          populate: ['ogImage', 'twitterImage']
        },
        sections: {
          populate: ['media', 'callToAction']
        },
        gallery: true,
        references: true,
        relatedArticles: {
          populate: ['featuredImage', 'author']
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
})); 