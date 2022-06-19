import { createServer, IncomingMessage, ServerResponse } from 'http';

export const serverStart = (): void => {
  const host = 'localhost';
  const port = parseInt(process.env.SERVER_PORT);

  const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.end("My first server!");
  };

  const server = createServer(requestListener);

  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}