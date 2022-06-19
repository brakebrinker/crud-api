import { User } from '../entities/User';
import { users, UserData } from '../data';
import { randomUUID } from 'crypto';

type GetOneByIdArgs = {
  readonly userId: string;
}

type SaveArgs = {
  readonly user: User;
}

type UpdateArgs = {
  readonly user: User;
}

type DeleteArgs = {
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
      id: user.id,
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    }

    users.push(userData);
    
    console.log(users);

    return user;
  }

  async update({user}: UpdateArgs): Promise<User> {
    const userIndex = users.findIndex((userData) => userData.id === user.id);

    const updateUser = <UserData>{
      id: user.id,
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    }

    users.splice(userIndex, 1);

    users.push(updateUser);

    return user;
  }

  async delete({user}: DeleteArgs): Promise<User> {
    const userIndex = users.findIndex((userData) => userData.id === user.id);

    users.splice(userIndex, 1);

    return user;
  }
}