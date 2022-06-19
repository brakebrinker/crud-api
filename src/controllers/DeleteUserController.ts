import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { App } from '../app';
import { ParsedUrlQuery } from 'querystring';
import { CreateUserDto } from '../dto/CreateUserDto';

type CreateArgs = {
  readonly app: App;
}

type DeleteUserArgs = {
  readonly userId: string;
}

export class DeleteUserController {
  readonly app: App;

  readonly userRepository: UserRepository;

  constructor({ app }: CreateArgs) {
    this.app = app;
    this.userRepository = new UserRepository();
  }

  async deleteUser({ userId }: DeleteUserArgs): Promise<void> {
    const user = await this.userRepository.getOneById({
      userId,
    })

    if (user === null) {
      await this.app.sendHttpCode({ httpCode: 404 });
      await this.app.sendResponse({ response: { error: 'User does not exist' } });

      return;
    }

    await this.userRepository.delete({
      user,
    });

    await this.app.sendHttpCode({ httpCode: 204 });
    await this.app.sendResponse({ response: user });
  }
}