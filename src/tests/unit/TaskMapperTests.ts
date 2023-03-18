import { Describe, Test } from "@jest-decorated/core"
import { TestTaskBuilder } from "../utils/TestTaskBuilder"
import { TaskMapper } from "../../adapters/out/persistence/TaskMapper"
import { Tasks } from "@prisma/client"
import { Task } from "../../core/Task"
import { TaskTitle } from "../../core/TaskTitle"
import { Deadline } from "../../core/Deadline"

@Describe()
export class TaskMapperShould {
  @Test()
  public MapToPrismaModel(): void {
    const task = new TestTaskBuilder().withDeadline(new Date()).build()

    const model = TaskMapper.toModel(task)

    expect(model).toEqual({
      title: task.title.value,
      deadline: task.deadline!.value,
    })
  }

  @Test()
  public MapToDomainEntity(): void {
    const model: Tasks = {
      id: 1,
      deadline: new Date(),
      title: "title",
    }

    const entity = TaskMapper.toDomain(model)

    expect(entity).toStrictEqual(
      new Task(new TaskTitle(model.title), new Deadline(model.deadline!))
    )
  }
}
