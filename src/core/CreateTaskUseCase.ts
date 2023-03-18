import { ITaskRepository } from "./ITaskRepository"
import { IDateService } from "./IDateService"
import { TaskFactory } from "./TaskFactory"

export class CreateTaskUseCase {
  public constructor(
    private readonly _taskRepository: ITaskRepository,
    private readonly _dateService: IDateService
  ) {}

  public async execute(request: CreateTaskRequest): Promise<void> {
    this.throwIfDeadlineOlderThanToday(request)

    const task = TaskFactory.create(request.title, request.deadline)

    await this._taskRepository.save(task)
  }

  private throwIfDeadlineOlderThanToday(request: CreateTaskRequest): void {
    if (
      request.deadline &&
      request.deadline < this._dateService.getTodaysDate()
    ) {
      throw new Error("A task's deadline has to be older than today")
    }
  }
}

export class CreateTaskRequest {
  public constructor(
    public readonly title: string,
    public readonly deadline?: Date
  ) {}
}
