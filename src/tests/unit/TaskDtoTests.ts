import { Describe, Test } from "@jest-decorated/core"
import { TestTaskBuilder } from "../utils/TestTaskBuilder"
import { TaskDto } from "../../core/TaskDto"

@Describe()
export class TaskDtoTests {
  @Test()
  public MapsFromAnEntityToItsOwnType(): void {
    const task = new TestTaskBuilder().withDeadline(new Date()).build()

    expect(TaskDto.from(task)).toStrictEqual(
      new TaskDto(task.title.value, task.deadline!.value)
    )
  }
}
