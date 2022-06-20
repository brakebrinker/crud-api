import { createServer, IncomingMessage, ServerResponse } from 'http';
import { users } from './data';
import { routes } from './consts/routes';
import { App } from './app';

export const serverStart = (): void => {
  const host = 'localhost';
  const port = parseInt(process.env.SERVER_PORT);

  const app = new App();

  const server = createServer(app.getRequestListener());

  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}