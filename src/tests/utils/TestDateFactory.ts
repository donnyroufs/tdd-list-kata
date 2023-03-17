export class TestDateFactory {
  private static readonly _today = new Date()

  public static tomorrow(): Date {
    return this.addDays(this._today, 1)
  }

  public static today(): Date {
    return this._today
  }

  private static addDays(date: any, amount: number): Date {
    const oneDayInMs = 86400 * 1000
    return new Date(Date.parse(date) + amount * oneDayInMs)
  }
}
