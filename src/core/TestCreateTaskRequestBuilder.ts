import { CreateTaskRequest } from "./CreateTaskUseCase"

export class TestCreateTaskRequestBuilder {
  private _title: string
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
    if (!this._title) {
      throw new Error("missing title")
    }

    return new CreateTaskRequest(this._title, this._deadline)
  }
}
