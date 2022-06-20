import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { App } from '../app';
import { ParsedUrlQuery } from 'querystring';
import { CreateUserDto } from '../dto/CreateUserDto';

type CreateArgs = {
  readonly app: App;
}

type CreateUserArgs = {
  readonly userData: ParsedUrlQuery;
}

export class CreateUserController {
  readonly app: App;

  readonly userRepository: UserRepository;

  constructor({ app }: CreateArgs) {
    this.app = app;
    this.userRepository = new UserRepository();
  }

  async createUser({ userData }: CreateUserArgs): Promise<void> {
    try {
      const userDto = CreateUserDto.createNewFromBody({
        userData,
      });

      const user = User.createNewFromDto(userDto);

      await this.userRepository.save({
        user,
      });

      await this.app.sendHttpCode({ httpCode: 201 });
      await this.app.sendResponse({ response: user });
    } catch (e) {
      await this.app.sendHttpCode({ httpCode: 400 });
      await this.app.sendResponse({ response: { error: e.message } });
    }
  }
}