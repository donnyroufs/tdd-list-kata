import { PrismaClient } from "@prisma/client"
import { TaskController } from "./adapters/in/http/TaskController"
import { TaskRepository } from "./adapters/out/TaskRepository"
import { CreateTaskUseCase } from "./core/CreateTaskUseCase"
import { ApiServer } from "./adapters/in/http/ApiServer"

export async function bootstrap(): Promise<void> {
  const api = new ApiServer()
  const prisma = new PrismaClient()
  const taskRepo = new TaskRepository(prisma)
  const createTask = new CreateTaskUseCase(taskRepo)
  const taskController = new TaskController(createTask)

  await api.start(taskController)
}

bootstrap()
