import { Describe, Test } from "@jest-decorated/core"
import { FakeTaskRepository } from "../../adapters/out/persistence/FakeTaskRepository"
import { TestTaskBuilder } from "../utils/TestTaskBuilder"
import { DateRange } from "../../core/DateRange"
import { TestDateFactory } from "../utils/TestDateFactory"

@Describe()
export class FakeTaskRepositoryTests {
  @Test()
  public async StoresATask(): Promise<void> {
    const sut = new FakeTaskRepository()
    const task = new TestTaskBuilder().withDeadline(new Date()).build()

    await sut.save(task)

    expect(sut.collection).toEqual([task])
  }

  @Test()
  public async FindsTasksDueByDate(): Promise<void> {
    const today = TestDateFactory.today()
    const tomorrow = TestDateFactory.tomorrow()
    const willBeFound = new TestTaskBuilder().withDeadline(today).build()
    const wontBeFound = new TestTaskBuilder().withDeadline(tomorrow).build()
    const sut = new FakeTaskRepository([willBeFound, wontBeFound])

    const tasks = await sut.findTasksDueToday(new DateRange(today))

    expect(tasks).toBeArrayOfSize(1)
    expect(tasks).toEqual([willBeFound])
  }
}
