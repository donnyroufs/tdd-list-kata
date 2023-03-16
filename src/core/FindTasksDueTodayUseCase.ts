import { Task } from "./Task"
import { ITaskRepository } from "./ITaskRepository"
import { IDateService } from "./IDateService"
import { DateRange } from "./DateRange"

export class FindTasksDueTodayUseCase {
  public constructor(
    private readonly _taskRepository: ITaskRepository,
    private readonly _dateService: IDateService
  ) {}

  public async execute(): Promise<Task[]> {
    return this._taskRepository.findTasksDueToday(
      new DateRange(this._dateService.getTodaysDate())
    )
  }
}
