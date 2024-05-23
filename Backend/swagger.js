const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Ineffabile Pizza',
            version: '1.0.0',
            description: 'Documentación de la API de Ineffabile Pizza',
            contact: {
                name: 'Ineffabile Pizza',
                email: 'info@ineffabilepizza.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:9100',
                description: 'Servidor de desarrollo'
            }
        ]
    },
    apis: ['./routes/*.js'] // Rutas de los archivos donde se encuentra la documentación de Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
