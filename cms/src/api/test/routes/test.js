'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/test',
      handler: 'test.index',
      config: {
        auth: false,
      },
    },
  ],
}; 