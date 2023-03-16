import { Request, Response } from "express"
import {
  CreateTaskRequest,
  CreateTaskUseCase,
} from "../../../core/CreateTaskUseCase"

export class TaskController {
  public constructor(private readonly _createTask: CreateTaskUseCase) {}

  public async create(req: Request, res: Response): Promise<void> {
    await this._createTask.execute(
      new CreateTaskRequest(req.body.title, new Date(req.body.deadline))
    )

    res.sendStatus(201)
  }
}
