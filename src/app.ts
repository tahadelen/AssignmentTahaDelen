import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { challengeRouter } from './routes/index';

import { NotFoundError } from './errors/not-found-error';
import { ErrorHandler } from './middlewares/error-handler';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(challengeRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(ErrorHandler);

export { app };