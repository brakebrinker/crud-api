import { User } from '../entities/User';
import { users, UserData } from '../data';
import { randomUUID } from 'crypto';

type GetOneByIdArgs = {
  readonly userId: string;
}

type SaveArgs = {
  readonly user: User;
}

export class UserRepository {
  async getAllUsers(): Promise<User[]> {
    return await Promise.all(
      users.map(
        async (user) => {
          return User.createNewFromData(user);
        }
      ),
    );
  }

  async getOneById({
    userId,
  }: GetOneByIdArgs): Promise<User | null> {
    const user = users.find((user) => user.id === userId);

    if (user === undefined) {
      return null;
    }

    return User.createNewFromData(user);
  }

  async save({user}: SaveArgs): Promise<User> {
    const userData = <UserData>{
      id: randomUUID(),
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    }

    users.push(userData);

    return user;
  }
}