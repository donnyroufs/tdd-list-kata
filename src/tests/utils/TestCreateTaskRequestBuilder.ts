import { CreateTaskRequest } from "../../core/CreateTaskUseCase"
import { faker as f } from "@faker-js/faker"

export class TestCreateTaskRequestBuilder {
  private _title: string = f.lorem.sentence()
  private _deadline?: Date

  public withTitle(title: string): this {
    this._title = title
    return this
  }

  public withDeadline(date: Date): this {
    this._deadline = date
    return this
  }

  public build(): CreateTaskRequest {
    return new CreateTaskRequest(this._title, this._deadline)
  }
}
