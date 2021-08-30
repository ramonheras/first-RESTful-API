import express from 'express';
import morgan from 'morgan';
import router from './routes/index';

const app = express();

// Settings
app.set('port', process.env.PORT || 7777); // todo: avoid globals

// Middleware
app.use('/', router);
app.use(morgan('dev'));

// Listen
app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));

// Exports
module.exports = app;
