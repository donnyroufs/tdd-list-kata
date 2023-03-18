import { Prisma, Tasks } from "@prisma/client"
import { Task } from "../../../core/Task"
import { TaskFactory } from "../../../core/TaskFactory"

export class TaskMapper {
  public static toDomain(task: Tasks): Task {
    return TaskFactory.create(task.title, task.deadline!)
  }

  public static toModel(entity: Task): Prisma.TasksCreateInput {
    return {
      title: entity.title.value,
      deadline: entity.deadline?.value ?? null,
    }
  }
}
