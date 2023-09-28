const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BoltsMaths API',
      version: '1.0.0',
      description: 'swagger ui for it',
    },
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
