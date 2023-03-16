import { Task } from "./Task"

export class TaskDto {
  public constructor(
    public readonly title: string,
    public readonly deadline?: Date
  ) {}

  public static from(task: Task): TaskDto {
    return new TaskDto(task.title.value, task.deadline?.value)
  }
}
