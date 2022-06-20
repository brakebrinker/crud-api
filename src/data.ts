export type UserData = {
  readonly username: string;
  readonly age: number;
  readonly hobbies: Array<string>;
  readonly id?: string;
}

export const users = [
  <UserData>{
    id: 'bee31757-7a47-4209-a94f-e27abb8b4ef5',
    username: 'Mark',
    age: 28,
    hobbies: [
      'motorbike',
      'hunter',
      'music',
    ]
  },
  <UserData>{
    id: 'ada1355a-8088-4956-b4e6-3d353c0b139f',
    username: 'Alex',
    age: 27,
    hobbies: [
      'motorbike',
      'skies',
      'plains',
    ]
  },
  <UserData>{
    id: '605d487f-21df-4a43-b4b6-88d7d9697e86',
    username: 'Francesco',
    age: 23,
    hobbies: [
      'motorbike',
      'climbing',
      'waterboard',
    ]
  },
  <UserData>{
    id: '45a5b3d9-0246-47f6-812b-7426122ddd14',
    username: 'Jack',
    age: 29,
    hobbies: [
      'motorbike',
      'fishing',
      'traveling',
    ]
  },
];
