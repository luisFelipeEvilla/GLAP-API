import swaggerAutogen from 'swagger-autogen';
import { SERVER_BASE_URL, SERVER_PORT} from './config';

const doc = {
  info: {
    title: 'GLAP API',
    description: 'GLAP API documentation',
  },
  host: `${SERVER_BASE_URL}:${SERVER_PORT}`,
  schemes: ['http'],
};

const outputFile = './public/swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import('./index');           // Your project's root file
}); 
