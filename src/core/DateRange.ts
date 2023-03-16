export class DateRange {
  public readonly from: Date
  public readonly to: Date

  public constructor(date: Date) {
    const from = new Date(date)
    from.setHours(0, 0, 0, 0)
    this.from = from

    const to = new Date(date)
    to.setHours(24, 0, 0, 0)
    this.to = to
  }
}
