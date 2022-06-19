import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { App } from '../app';
import { users } from '../data';
import { routes } from '../consts/routes';

type CreateArgs = {
  readonly app: App;
}

export class GetUsersController {
  readonly app: App;

  readonly userRepository: UserRepository;

  constructor({ app }: CreateArgs) {
    this.app = app;
    this.userRepository = new UserRepository();
  }

  async getUsers(): Promise<void> {
    const users = await this.userRepository.getAllUsers();

    await this.app.sendHttpCode({ httpCode: 200 });
    await this.app.sendResponse({ response: users });
  }
}