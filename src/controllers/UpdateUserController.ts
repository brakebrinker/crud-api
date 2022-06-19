import { UserRepository } from '../repositories/UserRepository';
import { App } from '../app';

type CreateArgs = {
  readonly app: App;
}

type UpdateUserArgs = {
  readonly id: string;
  readonly username?: string;
  readonly age?: string;
  readonly hobbies?: Array<string>;
}

export class UpdateUserController {
  readonly app: App;

  readonly userRepository: UserRepository;

  constructor({ app }: CreateArgs) {
    this.app = app;
    this.userRepository = new UserRepository();
  }

  async updateUser({ id, username, age, hobbies }: UpdateUserArgs): Promise<void> {
    const user = await this.userRepository.getOneById({
      userId: id,
    })

    if (user === null) {
      await this.app.sendHttpCode({ httpCode: 404 });
      await this.app.sendResponse({ response: { error: 'User does not exist' } });

      return;
    }

    user.username = username !== undefined ? username : user.username;
    user.age = age !== undefined ? parseInt(age) : user.age;
    user.hobbies = hobbies !== undefined ? user.hobbies.concat(hobbies): user.hobbies;

    await this.userRepository.update({
      user,
    });

    await this.app.sendHttpCode({ httpCode: 200 });
    await this.app.sendResponse({ response: user });
  }
}