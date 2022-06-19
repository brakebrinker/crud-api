import { UserData } from '../data';
import { CreateUserDto } from '../dto/CreateUserDto';

type CreateArgs = {
  readonly username: string;
  readonly age: number;
  readonly hobbies: Array<string>;
  readonly id?: string;
};

export class User {
  id: string;

  username: string;

  age: number;

  hobbies: Array<string>;

  private constructor(args: CreateArgs) {
    const {
      id,
      username,
      age,
      hobbies,
    } = args;

    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  static createNewFromData(data: UserData) {
    return new this({
      id: data.id,
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    })
  }

  static createNewFromDto(dto: CreateUserDto) {
    return new this({
      id: dto.id,
      username: dto.username,
      age: dto.age,
      hobbies: dto.hobbies,
    })
  }
}