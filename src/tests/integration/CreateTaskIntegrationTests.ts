import {
  AfterAll,
  AfterEach,
  BeforeEach,
  Describe,
  Test,
} from "@jest-decorated/core"
import { PrismaClient } from "@prisma/client"
import { TaskRepository } from "../../adapters/out/TaskRepository"
import { CreateTaskUseCase } from "../../core/CreateTaskUseCase"
import { ICreateTask } from "../ICreateTask"
import { ITestClient } from "../utils/ITestClient"
import { RealTestClient } from "../utils/RealTestClient"
import { TestCreateTaskRequestBuilder } from "../utils/TestCreateTaskRequestBuilder"
import { TestDatabaseClient } from "../utils/TestDatabaseClient"
import { TestTaskBuilder } from "../utils/TestTaskBuilder"

@Describe()
export class CreateTaskShould implements ICreateTask {
  private _client: PrismaClient
  private _db: ITestClient
  private _sut: CreateTaskUseCase

  @BeforeEach()
  public async setup(): Promise<void> {
    this._client = new PrismaClient()
    this._db = new RealTestClient(this._client)
    this._sut = new CreateTaskUseCase(new TaskRepository(this._client))
    await this._client.tasks.deleteMany()
  }

  @AfterAll()
  public async dispose(): Promise<void> {
    await this._client.$disconnect()
  }

  @Test()
  public async CreateATask(): Promise<void> {
    const request = new TestCreateTaskRequestBuilder()
      .withTitle("my task")
      .build()

    await this._sut.execute(request)

    const expectedTask = new TestTaskBuilder().withTitle(request.title).build()
    const confirmation = await this._db.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }

  @Test()
  public async CreateATaskWithADeadline(): Promise<void> {
    const date = new Date()
    const request = new TestCreateTaskRequestBuilder()
      .withTitle("my task")
      .withDeadline(date)
      .build()

    await this._sut.execute(request)

    const expectedTask = new TestTaskBuilder()
      .withTitle(request.title)
      .withDeadline(request.date!)
      .build()
    const confirmation = await this._db.getTasks()

    expect(confirmation).toStrictEqual([expectedTask])
  }
}
