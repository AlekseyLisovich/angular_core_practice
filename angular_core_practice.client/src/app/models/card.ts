export class Card {
    constructor(
      public id: number,
      public userId: number,
      public createdAt: Date,
      public author: string,
      public title: string) { }
  }
  