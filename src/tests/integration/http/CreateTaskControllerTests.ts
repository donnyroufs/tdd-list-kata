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
import { ITestClient } from "../../utils/ITestClient"
import { RealTestClient } from "../../utils/RealTestClient"
import { ApiServer } from "../../../adapters/in/http/ApiServer"
import { BaseCreateTask } from "../../BaseCreateTask"
import { RealTaskDriver } from "../../RealTaskDriver"

@Describe()
export class CreateTaskShould extends BaseCreateTask {
  private _prisma: PrismaClient
  private _testClient: ITestClient
  private _server: Server

  @BeforeAll()
  public async setup(): Promise<void> {
    this._prisma = new PrismaClient()
    this._testClient = new RealTestClient(this._prisma)
    const apiServer = new ApiServer()
    const repo = new TaskRepository(this._prisma)
    const useCase = new CreateTaskUseCase(repo)
    this._server = await apiServer.start(new TaskController(useCase))
    this.driver = new RealTaskDriver(api(this._server), this._prisma)
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
    await super.CreateATask()
  }
}
