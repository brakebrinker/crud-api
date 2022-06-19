import { UserRepository } from '../repositories/UserRepository';
import { App } from '../app';

type CreateArgs = {
  readonly app: App;
}

type GetUserArgs = {
  readonly userId: string;
}

export class GetUserController {
  readonly app: App;

  readonly userRepository: UserRepository;

  constructor({ app }: CreateArgs) {
    this.app = app;
    this.userRepository = new UserRepository();
  }

  async getUser({ userId }: GetUserArgs): Promise<void> {
    const user = await this.userRepository.getOneById({
      userId,
    });

    if (user === null) {
      await this.app.sendHttpCode({ httpCode: 404 });
      await this.app.sendResponse({ response: { error: 'User does not exist' } });

      return;
    }

    await this.app.sendHttpCode({ httpCode: 200 });
    await this.app.sendResponse({ response: user });
  }
}