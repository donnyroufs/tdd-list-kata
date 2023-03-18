import { PrismaClient } from "@prisma/client"
import { TaskController } from "./adapters/in/http/TaskController"
import { TaskRepository } from "./adapters/out/persistence/TaskRepository"
import { CreateTaskUseCase } from "./core/CreateTaskUseCase"
import { ApiServer } from "./adapters/in/http/ApiServer"
import { DateService } from "./adapters/out/DateService"
import { FindTasksDueTodayUseCase } from "./core/FindTasksDueTodayUseCase"

export async function bootstrap(): Promise<void> {
  const api = new ApiServer()
  const prisma = new PrismaClient()
  const taskRepo = new TaskRepository(prisma)
  const dateService = new DateService()
  const createTask = new CreateTaskUseCase(taskRepo, dateService)
  const findTasksDueToday = new FindTasksDueTodayUseCase(taskRepo, dateService)
  const taskController = new TaskController(createTask, findTasksDueToday)

  await api.start(taskController)
}

bootstrap()
