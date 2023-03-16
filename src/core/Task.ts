import { TaskTitle } from "./TaskTitle"
import { Deadline } from "./Deadline"

export class Task {
  public constructor(
    public readonly title: TaskTitle,
    public readonly deadline?: Deadline
  ) {}
}
