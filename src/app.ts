import { IncomingMessage, RequestListener, ServerResponse } from 'http';
import { routes } from './consts/routes';
import { GetUsersController } from './controllers/GetUsersController';
import { ParseUrlService } from './services/ParseUrlService';
import { join } from 'path';
import { GetUserController } from './controllers/GetUserController';
import { CreateUserController } from './controllers/CreateUserController';
import { parse } from 'querystring';
import { UserData } from './data';
import { UpdateUserController } from './controllers/UpdateUserController';


type CreateArgs = {
  readonly req: IncomingMessage;
  readonly res: ServerResponse;
}

type ApplyResultArgs = {
  readonly result: unknown;
  readonly httpCode: number;
}

type SendHttpCodeArgs = {
  readonly httpCode: number;
}
type SendResponseArgs = {
  readonly response: unknown;
}

type ValidateUuidParameterArgs = {
  readonly parameterValue: string;
}

export class App {
  req: IncomingMessage;

  res: ServerResponse;

  constructor() {
  }

  async sendHttpCode({ httpCode }: SendHttpCodeArgs) {
    this.res.writeHead(httpCode);
  }

  async sendResponse({ response }: SendResponseArgs) {
    this.res.end(JSON.stringify(response));
  }

  getRequestListener(): RequestListener {
    return async (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'application/json');

      this.req = req;
      this.res = res;

      if (req.method === 'GET') {
        const parameterValue = ParseUrlService.getParameterValue({
          url: req.url,
        });

        switch (req.url) {
          case routes.users:
            const getUsersController = new GetUsersController({ app: this });
            await getUsersController.getUsers();
            break;
          case `${routes.users}/${parameterValue}`:
            const isValidUuid = await this.validateUuidParameter({ parameterValue });

            if (!isValidUuid) {
              break;
            }

            const getUserController = new GetUserController({ app: this });
            await getUserController.getUser({ userId: parameterValue });
            break;
          default:
            await this.applyResult({
              result: { error: 'Resource not found' },
              httpCode: 404,
            });
        }
      }

      if (req.method === 'POST') {
        const parameterValue = ParseUrlService.getParameterValue({
          url: req.url,
        });

        switch (req.url) {
          case routes.users:
            let body = '';

            req.on('data', async (data) => {
              body += data;

              if (body.length > 1e6) {
                req.connection.destroy();
              }
            });

            req.on('end', async () => {
              const userData = parse(body);

              const createUserController = new CreateUserController({ app: this });
              await createUserController.createUser({ userData });
            });

            break;
          case `${routes.users}/${parameterValue}`:

            const splittedParameterValue = parameterValue.split('?')[0];

            const isValidUuid = await this.validateUuidParameter({
              parameterValue: splittedParameterValue
            });

            if (!isValidUuid) {
              break;
            }

            let bodyUpdate = '';

            req.on('data', async (data) => {
              bodyUpdate += data;

              if (bodyUpdate.length > 1e6) {
                req.connection.destroy();
              }
            });

            req.on('end', async () => {
              const userData = parse(bodyUpdate);

              const updateUserController = new UpdateUserController({ app: this });
              await updateUserController.updateUser({
                id: splittedParameterValue,
                username: userData.username !== undefined ? userData.username.toString() : undefined,
                age: userData.age !== undefined ? userData.age.toString() : undefined,
                hobbies: userData.hobbies !== undefined ? userData.hobbies.toString().split(',') : undefined,
              });
            });

            break;
          default:
            await this.applyResult({
              result: { error: 'Resource not found' },
              httpCode: 404,
            });
        }
      }
    };
  }

  private async validateUuidParameter({ parameterValue }: ValidateUuidParameterArgs): Promise<boolean> {
    const isUuid = ParseUrlService.isParameterValueUuid({ parameterValue });

    if (!isUuid) {
      await this.applyResult({
        result: { error: 'Parameter is not UUID' },
        httpCode: 400,
      });

      return false;
    }

    return true;
  }

  private async applyResult({
    result,
    httpCode,
  }: ApplyResultArgs) {
    await this.sendHttpCode({httpCode});
    await this.sendResponse({response: result});
  }
}
