import { Describe, Test } from "@jest-decorated/core"
import { TaskTitle } from "../../core/TaskTitle"

@Describe()
export class TaskTitleTests {
  @Test()
  public throwsWhenInvalidTitle(): void {
    expect(() => new TaskTitle("")).toThrowError(
      "Title must have a length greater than 0"
    )
  }
}
