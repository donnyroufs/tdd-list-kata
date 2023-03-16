import { ITaskRepository } from "./ITaskRepository"
import { Task } from "./Task"

export class CreateTaskUseCase {
  public constructor(private readonly _taskRepository: ITaskRepository) {}

  public async execute(request: CreateTaskRequest): Promise<void> {
    const task = new Task(request.title, request.date)
    await this._taskRepository.save(task)
  }
}

export class CreateTaskRequest {
  public constructor(
    public readonly title: string,
    public readonly date?: Date
  ) {}
}
