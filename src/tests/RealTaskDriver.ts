import { PrismaClient } from "@prisma/client"
import { Task } from "../core/Task"
import { ICreateTaskDriver } from "./BaseCreateTask"
import api from "supertest"
import { TestCreateTaskRequestBuilder } from "./utils/TestCreateTaskRequestBuilder"

interface ITestHooks {
  beforeAll(): Promise<void>
  beforeEach(): Promise<void>
  afterAll(): Promise<void>
}

export class RealTaskDriver implements ICreateTaskDriver {
  public constructor(
    private readonly _api: api.SuperTest<any>,
    private readonly _prisma: PrismaClient
  ) {}

  public async add(amount: number): Promise<void> {
    for (let i = 0; i < amount; i++) {
      const request = new TestCreateTaskRequestBuilder()
        .withTitle("my task")
        .withDeadline(new Date())
        .build()

      await this._api.post("/task").send(request)
    }
  }

  public async getTasks(): Promise<Task[]> {
    return (await this._prisma.tasks.findMany()).map(
      (task) =>
        new Task(task.title, task.deadline !== null ? task.deadline : undefined)
    )
  }
}
