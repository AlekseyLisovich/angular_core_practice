export class Post {
    constructor(
      public id: number,
      public blogId: number,
      public title: string,
      public createdAt: Date,
      public content: string)
       { }
  }
  