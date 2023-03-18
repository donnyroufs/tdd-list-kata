import { ITaskRepository } from "./ITaskRepository"
import { Task } from "./Task"
import { Deadline } from "./Deadline"
import { TaskTitle } from "./TaskTitle"
import { IDateService } from "./IDateService"

export class CreateTaskUseCase {
  public constructor(
    private readonly _taskRepository: ITaskRepository,
    private readonly _dateService: IDateService
  ) {}

  public async execute(request: CreateTaskRequest): Promise<void> {
    if (!request.deadline) {
      const task = new Task(new TaskTitle(request.title))
      await this._taskRepository.save(task)
      return
    }

    if (new Date(request.deadline) < this._dateService.getTodaysDate()) {
      throw new Error(
        "You cannot create a task with a deadline thats older than today"
      )
    }

    const task = new Task(
      new TaskTitle(request.title),
      new Deadline(request.deadline)
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
