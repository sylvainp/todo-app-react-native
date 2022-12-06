export default class TodoEntity {
  private _done: boolean = false;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
  ) {}

  get isDone(): boolean {
    return this._done;
  }

  markDone(): void {
    this._done = true;
  }
}
