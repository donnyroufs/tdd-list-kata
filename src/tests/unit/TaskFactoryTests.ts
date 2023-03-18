import { Describe, Test } from "@jest-decorated/core"
import { TaskFactory } from "../../core/TaskFactory"
import { Task } from "../../core/Task"
import { TaskTitle } from "../../core/TaskTitle"
import { Deadline } from "../../core/Deadline"

@Describe()
export class TaskFactoryShould {
  @Test()
  public CreatesATask(): void {
    const date = new Date()
    const task = TaskFactory.create("title", date)

    expect(task).toStrictEqual(
      new Task(new TaskTitle("title"), new Deadline(date))
    )
  }
}
