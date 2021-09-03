import express from 'express';
import morgan from 'morgan';
import router from './routes/index';
import 'dotenv-defaults/config';

const app = express();

// Middleware
app.use(express.json());
app.use('/', router);
app.use(morgan('dev'));

// Listen
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

// Exports
module.exports = app;
