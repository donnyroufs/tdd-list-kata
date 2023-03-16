import { PrismaClient } from "@prisma/client"
import { Task } from "../../core/Task"
import api from "supertest"
import { TestCreateTaskRequestBuilder } from "../utils/TestCreateTaskRequestBuilder"
import { ITaskDriver } from "./ITaskDriver"
import { Server } from "http"
import { ApiServer } from "../../adapters/in/http/ApiServer"
import { TaskRepository } from "../../adapters/out/persistence/TaskRepository"
import { CreateTaskUseCase } from "../../core/CreateTaskUseCase"
import { TaskController } from "../../adapters/in/http/TaskController"
import { TaskTitle } from "../../core/TaskTitle"
import { Deadline } from "../../core/Deadline"
import { FindTasksDueTodayUseCase } from "../../core/FindTasksDueTodayUseCase"
import { IDateService } from "../../core/IDateService"
import { mock, mockClear, MockProxy } from "jest-mock-extended"
import { TaskDto } from "../../core/TaskDto"

export class RealTaskDriver implements ITaskDriver {
  private static TODAYS_DATE = new Date()
  private _server: Server
  private readonly _prisma: PrismaClient
  private readonly _dateService: MockProxy<IDateService>

  public constructor() {
    this._prisma = new PrismaClient()
    this._dateService = mock<IDateService>()
  }

  public async add(amount: number): Promise<void> {
    for (let i = 0; i < amount; i++) {
      const request = new TestCreateTaskRequestBuilder()
        .withTitle("my task")
        .withDeadline(new Date())
        .build()

      await api(this._server).post("/task").send(request)
    }
  }

  public async getTasks(): Promise<Task[]> {
    return (await this._prisma.tasks.findMany()).map(
      (task) =>
        new Task(
          new TaskTitle(task.title),
          task.deadline !== null ? new Deadline(task.deadline) : undefined
        )
    )
  }

  public async addTaskWithDeadline(
    amount: number,
    deadline: Date
  ): Promise<void> {
    RealTaskDriver.TODAYS_DATE = deadline
    for (let i = 0; i < amount; i++) {
      const request = new TestCreateTaskRequestBuilder()
        .withTitle("my task")
        .withDeadline(RealTaskDriver.TODAYS_DATE)
        .build()

      await api(this._server).post("/task").send(request)
    }
  }

  public async getTasksDueByDate(today: Date): Promise<TaskDto[]> {
    this._dateService.getTodaysDate.mockReturnValue(today)
    const result = await api(this._server).get("/task")

    return result.body
  }

  public async beforeAll(): Promise<void> {
    const apiServer = new ApiServer()
    const repo = new TaskRepository(this._prisma)
    const useCase = new CreateTaskUseCase(repo)
    this._server = await apiServer.start(
      new TaskController(
        useCase,
        new FindTasksDueTodayUseCase(repo, this._dateService)
      )
    )
  }

  public async beforeEach(): Promise<void> {
    await this._prisma.tasks.deleteMany()
    mockClear(this._dateService)
  }

  public async afterAll(): Promise<void> {
    await this._server.close()
    await this._prisma.$disconnect()
  }

  public setCurrentDate(date: Date): void {
    this._dateService.getTodaysDate.mockReturnValue(date)
  }
}
