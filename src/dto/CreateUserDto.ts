import { randomUUID } from 'crypto';
import { ParsedUrlQuery } from 'querystring';

type CreateArgs = {
  readonly id: string;
  readonly username: string;
  readonly age: number;
  readonly hobbies: Array<string>;
}

type CreateFromBodyArgs = {
  readonly userData: ParsedUrlQuery;
};

export class CreateUserDto {
  readonly id: string;

  readonly username: string;

  readonly age: number;

  readonly hobbies: Array<string>;

  private constructor({
    id,
    username,
    age,
    hobbies,
  }: CreateArgs) {
    this.id = id;
    this.age = age;
    this.username = username;
    this.hobbies = hobbies;
  }

  static createNewFromBody({
    userData
  }: CreateFromBodyArgs): CreateUserDto {
    if (userData.username === undefined) {
      throw new Error('Username not provided');
    }

    if (userData.age === undefined) {
      throw new Error('Age not provided');
    }

    if (userData.hobbies === undefined) {
      throw new Error('Hobbies not provided');
    }


    return new this({
      id: randomUUID(),
      username: userData.username.toString(),
      age: parseInt(userData.age.toString()),
      hobbies: userData.hobbies.toString().split(','),
    })
  }
}