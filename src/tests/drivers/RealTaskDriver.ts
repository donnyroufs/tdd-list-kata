import { PrismaClient } from "@prisma/client"
import { Task } from "../../core/Task"
import api from "supertest"
import { TestCreateTaskRequestBuilder } from "../utils/TestCreateTaskRequestBuilder"
import { ITaskDriver } from "./ITaskDriver"
import { Server } from "http"
import { ApiServer } from "../../adapters/in/http/ApiServer"
import { TaskRepository } from "../../adapters/out/TaskRepository"
import { CreateTaskUseCase } from "../../core/CreateTaskUseCase"
import { TaskController } from "../../adapters/in/http/TaskController"
import { TaskTitle } from "../../core/TaskTitle"
import { Deadline } from "../../core/Deadline"

export class RealTaskDriver implements ITaskDriver {
  private _server: Server
  private readonly _prisma: PrismaClient

  public constructor() {
    this._prisma = new PrismaClient()
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

  public async beforeAll(): Promise<void> {
    const apiServer = new ApiServer()
    const repo = new TaskRepository(this._prisma)
    const useCase = new CreateTaskUseCase(repo)
    this._server = await apiServer.start(new TaskController(useCase))
  }

  public async beforeEach(): Promise<void> {
    await this._prisma.tasks.deleteMany()
  }

  public async afterAll(): Promise<void> {
    await this._server.close()
    await this._prisma.$disconnect()
  }
}
