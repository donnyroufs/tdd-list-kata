import { Task } from "./Task"
import { TaskTitle } from "./TaskTitle"
import { Deadline } from "./Deadline"

export class TaskFactory {
  public static create(title: string, date?: Date): Task {
    const taskTitle = new TaskTitle(title)
    const deadline = date ? new Deadline(date) : undefined

    return new Task(taskTitle, deadline)
  }
}
