import { Describe, Test } from "@jest-decorated/core"
import { DateRange } from "../../core/DateRange"

@Describe()
class DateRangeShould {
  @Test()
  public shouldCreateARangeBetween0And24(): void {
    const date = new Date("02-02-2002 15:00:00")
    const range = new DateRange(date)

    expect(range.from).toEqual(new Date("02-02-2002 00:00:00"))
    expect(range.to).toEqual(new Date("02-03-2002 00:00:00"))
  }
}
