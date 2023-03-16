import {
  Describe,
  BeforeEach,
  AfterAll,
  Test,
  BeforeAll,
} from "@jest-decorated/core"
import { PrismaClient } from "@prisma/client"
import { Server } from "http"
import api from "supertest"
import { TaskController } from "../../../adapters/in/http/TaskController"
import { TaskRepository } from "../../../adapters/out/TaskRepository"
import { CreateTaskUseCase } from "../../../core/CreateTaskUseCase"
import { ICreateTask } from "../../ICreateTask"
import { ITestClient } from "../../utils/ITestClient"
import { RealTestClient } from "../../utils/RealTestClient"
import { TestTaskBuilder } from "../../utils/TestTaskBuilder"
import { ApiServer } from "./ApiServer"

@Describe()
export class CreateTaskShould implements ICreateTask {
  private _prisma: PrismaClient
  private _testClient: ITestClient
  private _server: Server

  @BeforeAll()
  public async setup(): Promise<void> {
    this._prisma = new PrismaClient()
    this._testClient = new RealTestClient(this._prisma)
    const repo = new TaskRepository(this._prisma)
    const useCase = new CreateTaskUseCase(repo)
    const api = new ApiServer()
    this._server = await api.start(new TaskController(useCase))
  }

  @BeforeEach()
  public async stopServer(): Promise<void> {
    await this._testClient.clearTasks()
  }

  @AfterAll()
  public async dispose(): Promise<void> {
    await this._testClient.dispose()
    await this._server.close()
  }

  @Test()
  public async CreateATask(): Promise<void> {
    const response = await api(this._server).post("/task").send({
      title: "my task",
    })

    expect(response.status).toBe(201)

    const expectedTask = new TestTaskBuilder().withTitle("my task").build()
    const confirmation = await this._testClient.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }

  @Test()
  public async CreateATaskWithADeadline(): Promise<void> {
    const date = new Date()
    const response = await api(this._server).post("/task").send({
      title: "my task",
      deadline: date,
    })

    expect(response.status).toBe(201)

    const expectedTask = new TestTaskBuilder()
      .withTitle("my task")
      .withDeadline(date)
      .build()
    const confirmation = await this._testClient.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }
}
