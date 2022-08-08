import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import routes from './api/routes';
import logger from './api/middlewares/logger.middleware';
import errorHandler from './api/middlewares/error-handler.middleware';
import * as MySQLConnector from './api/utils/mysql.connector';

const app = express();
const port = 3000;

// create database pool
MySQLConnector.init();

// serve static files
app.use(express.static(path.join(__dirname, '../dist/public')));

// compresses all the responses
app.use(compression());

// adding set of security middlewares
app.use(helmet());

// parse incoming request body and append data to `req.body`
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable all CORS request 
app.use(cors());

// add logger middleware
app.use(logger);

app.use('/api/', routes);

// add custom error handler middleware as the last middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
