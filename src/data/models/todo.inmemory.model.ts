export default class TodoInMemoryModel {
  constructor(
    private _id: string,
    private _description: string | null,
    private _done: boolean,
    private _title: string,
  ) {}
  set done(value: boolean) {
    this._done = value;
  }

  get isDone(): boolean {
    return this._done;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | null {
    return this._description;
  }

  get id(): string {
    return this._id;
  }
}
