const dotenv = require("dotenv")
dotenv.config();
const swaggerAutogen = require('swagger-autogen')()
const port = process.env.APP_PORT  
console.log(port);
const doc = {
    info: {
        version: "1.0.0",
        title: "API Autentificacion",
        description: "Api de autentificacion para el proyecto de gestion de residuos"
    },
    host: `localhost:${port}`,
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    tags: [
        {
            "name": "Auth",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth:{
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    definitions: {
        Parents: {
            father: "Simon Doe",
            mother: "Marie Doe"
        },
        User: {
            name: "Jhon Doe",
            age: 29,
            parents: {
                $ref: '#/definitions/Parents'
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./dist/src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./dist/src/index')           // Your project's root file
})