export default class TodoEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    private done: boolean = false,
  ) {}

  get isDone(): boolean {
    return this.done;
  }

  markDone(): void {
    this.done = true;
  }
}
