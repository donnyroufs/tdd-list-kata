import { Request, Response } from "express"
import {
  CreateTaskRequest,
  CreateTaskUseCase,
} from "../../../core/CreateTaskUseCase"
import { FindTasksDueTodayUseCase } from "../../../core/FindTasksDueTodayUseCase"

export class TaskController {
  public constructor(
    private readonly _createTask: CreateTaskUseCase,
    private readonly _findTasksDueToday: FindTasksDueTodayUseCase
  ) {}

  public async findTasksDueToday(req: Request, res: Response): Promise<any> {
    const tasks = await this._findTasksDueToday.execute()
    return res.status(200).json(tasks)
  }

  public async create(req: Request, res: Response): Promise<void> {
    await this._createTask.execute(
      new CreateTaskRequest(req.body.title, new Date(req.body.deadline))
    )

    res.sendStatus(201)
  }
}
