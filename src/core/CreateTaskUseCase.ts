import { ITaskRepository } from "./ITaskRepository"
import { Task } from "./Task"
import { Deadline } from "./Deadline"
import { TaskTitle } from "./TaskTitle"

export class CreateTaskUseCase {
  public constructor(private readonly _taskRepository: ITaskRepository) {}

  public async execute(request: CreateTaskRequest): Promise<void> {
    const task = new Task(
      new TaskTitle(request.title),
      request.deadline ? new Deadline(request.deadline) : undefined
    )
    await this._taskRepository.save(task)
  }
}

export class CreateTaskRequest {
  public constructor(
    public readonly title: string,
    public readonly deadline?: Date
  ) {}
}
