import { createServer } from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { cors } from './middlewares/cors';
import { addErrorThrower } from './middlewares/error-thrower';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './middlewares/logger';
import { router } from './configs/router';

dotenv.config();

const app: Express = express();
const server = createServer(app);

app.use(helmet());
app.use(cors);
app.use(logger)
app.use(express.json());
app.use(addErrorThrower);
app.use('/api/v1/', router);
app.use((request: Request, response: Response, next: NextFunction) => {
  response.sendStatus(404)
})
app.use(errorHandler);

export function Server() {
  const port = process.env.PORT;
  server.listen(port || 80, () => console.log(`Server is running on port ${port}`))
}

export default app
