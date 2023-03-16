import { Prisma, Tasks } from "@prisma/client"
import { Task } from "../../../core/Task"
import { Deadline } from "../../../core/Deadline"
import { TaskTitle } from "../../../core/TaskTitle"

export class TaskMapper {
  public static toDomain(task: Tasks): Task {
    return new Task(
      new TaskTitle(task.title),
      task.deadline ? new Deadline(task.deadline) : undefined
    )
  }

  public static toModel(entity: Task): Prisma.TasksCreateInput {
    return {
      title: entity.title.value,
      deadline: entity.deadline?.value ?? null,
    }
  }
}
