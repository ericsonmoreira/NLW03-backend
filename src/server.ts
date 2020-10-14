import express from 'express';
import path from 'path';
import routes from './routes';
import './database/connection';
import 'express-async-errors';
import errorHandler from './errors/handler';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(3333, () => {
  console.log('Online in http://localhost:3333/');
});
