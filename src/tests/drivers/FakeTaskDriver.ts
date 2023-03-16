import { Task } from "../../core/Task"
import { FakeTaskRepository } from "../../adapters/out/FakeTaskRepository"
import { ITaskDriver } from "./ITaskDriver"
import { CreateTaskUseCase } from "../../core/CreateTaskUseCase"
import { TestCreateTaskRequestBuilder } from "../utils/TestCreateTaskRequestBuilder"
import { FindTasksDueTodayUseCase } from "../../core/FindTasksDueTodayUseCase"
import { mock, MockProxy } from "jest-mock-extended"
import { IDateService } from "../../core/IDateService"

export class FakeTaskDriver implements ITaskDriver {
  private readonly _createTaskUseCase: CreateTaskUseCase
  private readonly _findTasksDueTodayUseCase: FindTasksDueTodayUseCase
  private readonly _repo: FakeTaskRepository
  private readonly _dateService: MockProxy<IDateService>

  public constructor() {
    this._repo = new FakeTaskRepository()
    this._createTaskUseCase = new CreateTaskUseCase(this._repo)
    this._dateService = mock<IDateService>()
    this._findTasksDueTodayUseCase = new FindTasksDueTodayUseCase(
      this._repo,
      this._dateService
    )
  }

  public async add(amount: number): Promise<void> {
    for (let i = 0; i < amount; i++) {
      const task = new TestCreateTaskRequestBuilder()
        .withTitle(Math.random().toString())
        .withDeadline(new Date())
        .build()

      await this._createTaskUseCase.execute(task)
    }
  }

  public async getTasks(): Promise<Task[]> {
    return this._repo.collection
  }

  public async addTaskWithDeadline(
    amount: number,
    deadline: Date
  ): Promise<void> {
    for (let i = 0; i < amount; i++) {
      const task = new TestCreateTaskRequestBuilder()
        .withTitle(Math.random().toString())
        .withDeadline(deadline)
        .build()

      await this._createTaskUseCase.execute(task)
    }
  }

  public async getTasksDueByDate(today: Date): Promise<Task[]> {
    return this._findTasksDueTodayUseCase.execute()
  }

  public setCurrentDate(date: Date): void {
    this._dateService.getTodaysDate.mockReturnValue(date)
  }
}
