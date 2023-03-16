import { Task } from "../../core/Task"
import { TaskTitle } from "../../core/TaskTitle"
import { Deadline } from "../../core/Deadline"

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

    if (!this._deadline) {
      return new Task(new TaskTitle(this._title))
    }

    return new Task(new TaskTitle(this._title), new Deadline(this._deadline))
  }
}
