import { Task } from "./Task"

export class TestTaskBuilder {
  private _title: string
  private _deadline?: Date

  public withTitle(title: string): this {
    this._title = title
    return this
  }

  public withDeadline(date: Date): this {
    this._deadline = date
    return this
  }

  public build(): Task {
    if (!this._title) {
      throw new Error("missing title")
    }

    return new Task(this._title, this._deadline)
  }
}
