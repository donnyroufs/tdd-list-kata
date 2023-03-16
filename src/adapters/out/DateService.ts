import { IDateService } from "../../core/IDateService"

export class DateService implements IDateService {
  public getTodaysDate(): Date {
    return new Date()
  }
}
