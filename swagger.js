import swaggerAutogenFactory from 'swagger-autogen';

const swaggerAutogen = swaggerAutogenFactory();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app/api/swagger/route.ts'];

swaggerAutogen(outputFile, endpointsFiles);
