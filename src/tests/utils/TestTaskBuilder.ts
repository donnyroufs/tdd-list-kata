import { Task } from "../../core/Task"
import { TaskTitle } from "../../core/TaskTitle"
import { Deadline } from "../../core/Deadline"
import { faker as f } from "@faker-js/faker"

export class TestTaskBuilder {
  private _title: string = f.lorem.sentence()
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
    if (!this._deadline) {
      return new Task(new TaskTitle(this._title))
    }

    return new Task(new TaskTitle(this._title), new Deadline(this._deadline))
  }
}
