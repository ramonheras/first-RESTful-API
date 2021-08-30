import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger_output.json';

const docRoute = express.Router();

docRoute.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = docRoute;
