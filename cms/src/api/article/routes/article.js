'use strict';

/**
 * article router
 */

module.exports = {
  routes: [
    // Read operations - public access
    {
      method: 'GET',
      path: '/articles',
      handler: 'article.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/:id',
      handler: 'article.findOne',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/slug/:slug',
      handler: 'article.findOne',
      config: {
        auth: false,
      },
    },
    // Write operations - require authentication
    {
      method: 'POST',
      path: '/articles',
      handler: 'article.create',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/articles/:id',
      handler: 'article.update',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/articles/:id',
      handler: 'article.delete',
      config: {
        auth: {
          strategies: ['api-token'],
        },
      },
    },
  ],
}; 