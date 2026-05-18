const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Rüya Günlüğü API',
            version: '1.0.0',
            description: 'Vanilla JS SPA + Node.js/Express + SQLite tabanlı kişisel rüya arşivi uygulamasının RESTful API dokümantasyonu.',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Yerel Geliştirme Sunucusu',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token: Login veya Register endpoint\'inden alınan token\'ı buraya girin.'
                },
            },
            schemas: {
                Dream: {
                    type: 'object',
                    properties: {
                        public_id: {
                            type: 'string',
                            description: 'UUID formatında benzersiz kimlik (numeric id gizlidir)',
                            example: '550e8400-e29b-41d4-a716-446655440000'
                        },
                        title: {
                            type: 'string',
                            example: 'Uçan şehir'
                        },
                        content: {
                            type: 'string',
                            example: 'Bulutların üzerinde bir şehirde yürüyordum...'
                        },
                        category: {
                            type: 'string',
                            enum: ['Lucid', 'Kabus', 'Huzurlu', 'Garip', 'Nostaljik', 'Macera', 'Kozmik', 'Diğer'],
                            example: 'Lucid'
                        },
                        date: {
                            type: 'string',
                            example: '2026-05-17 10:30:00'
                        },
                        created_at: {
                            type: 'string',
                            example: '2026-05-17 10:30:00'
                        },
                        updated_at: {
                            type: 'string',
                            example: '2026-05-17 10:30:00'
                        }
                    }
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
