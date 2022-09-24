import swaggerAutogen from 'swagger-autogen';
import { SERVER_BASE_URL, SERVER_PORT } from './config';
import { providerTypes, roles } from './db/enums';

const doc = {
  info: {
    version: '0.1.0',
    title: 'GLAP API',
    description: 'GLAP API documentation',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  host: `${SERVER_BASE_URL}:${SERVER_PORT}`,
  schemes: ['http'],
  definitions: {
    user: {
      _id: "632e1c7a56c75874e0c6a1233", // assigned by data base
      name: "jhon Doe",
      identification_number: "1234567891",
      email: "jhon.doe@gmail.com",
      password: "jhon",
      role: roles,
      provider_type: providerTypes,
    },

    report: {
      _id: "632e1c7a56c75874e0c6a1233", // asigned by database
      user: "jhon Doe",
      provider: "american gas",
      description: "bad service",
      geolocation: {
        "type": "Point",
        "coordinates": [
            -73.856077,
            40.848447
        ]
      },
      createdAt: new Date().toISOString(),
      visibleAt: new Date().toISOString()
    },
    reportConfirmation: {
      _id: "632e1c7a56c75874e0c221232303",
      user: "632e1c7a56c75874e0c6a154",
      createdAt: new Date().toISOString()
    },
    reportSolutionated: {
      _id: "632e1c7a56c75874e0c6a154",
      user: "632e1c7a56c75874e0c6a1233", // can be a user or the same provider report the breakdown
      provider: "632e1c7a56c75874e0c6a1445",
      createdAt: new Date().toISOString()
    }
  },
};

const outputFile = './public/swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc).then(async () => {
  await import('./index');           // Your project's root file
}); 
