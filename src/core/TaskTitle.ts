export class TaskTitle {
  public readonly value: string

  public constructor(value: string) {
    if (value.length === 0) {
      throw new Error("Title must have a length greater than 0")
    }

    this.value = value
  }
}
