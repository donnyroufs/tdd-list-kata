import { ITaskRepository } from "./ITaskRepository"
import { IDateService } from "./IDateService"
import { DateRange } from "./DateRange"
import { TaskDto } from "./TaskDto"

type FindTasksDueTodayResponse = TaskDto[]

export class FindTasksDueTodayUseCase {
  public constructor(
    private readonly _taskRepository: ITaskRepository,
    private readonly _dateService: IDateService
  ) {}

  public async execute(): Promise<FindTasksDueTodayResponse> {
    const tasks = await this._taskRepository.findTasksDueToday(
      new DateRange(this._dateService.getTodaysDate())
    )

    return tasks.map(TaskDto.from)
  }
}
