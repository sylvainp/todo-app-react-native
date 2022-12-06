export default class TodoModel {
  constructor(
    public readonly id: string,
    public readonly description: string | null,
    public readonly done: boolean,
    public readonly title: string,
  ) {}
}
