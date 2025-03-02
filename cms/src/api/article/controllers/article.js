'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    // Merge any existing populate with our required populate
    const populate = ctx.query.populate ? { ...ctx.query.populate } : {};
    
    ctx.query = {
      ...ctx.query,
      populate: {
        ...populate,
        featuredImage: true,
        author: {
          populate: ['profilePicture']
        },
        categories: true,
        tags: true,
        seo: {
          populate: ['ogImage', 'twitterImage', 'metaSocial']
        },
        gallery: true,
        references: true,
        cta: true
      }
    };
    
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  
  async findOne(ctx) {
    // Merge any existing populate with our required populate
    const populate = ctx.query.populate ? { ...ctx.query.populate } : {};
    
    ctx.query = {
      ...ctx.query,
      populate: {
        ...populate,
        featuredImage: true,
        author: {
          populate: ['profilePicture', 'socialLinks']
        },
        categories: true,
        tags: true,
        seo: {
          populate: ['ogImage', 'twitterImage', 'metaSocial']
        },
        gallery: true,
        references: true,
        cta: true,
        relatedArticles: {
          populate: ['featuredImage', 'author']
        }
      }
    };
    
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    
    // Set the filters to find by slug
    ctx.query = {
      ...ctx.query,
      filters: {
        slug: {
          $eq: slug
        }
      },
      populate: {
        featuredImage: true,
        author: {
          populate: ['profilePicture', 'socialLinks']
        },
        categories: true,
        tags: true,
        seo: {
          populate: ['ogImage', 'twitterImage', 'metaSocial']
        },
        gallery: true,
        references: true,
        cta: true,
        relatedArticles: {
          populate: ['featuredImage', 'author']
        }
      }
    };
    
    // Use the find method to get the article by slug
    const { data, meta } = await super.find(ctx);
    
    // Return the first item if found, otherwise return null
    if (data && data.length > 0) {
      return { data: data[0], meta };
    }
    
    return { data: null, meta };
  }
})); 