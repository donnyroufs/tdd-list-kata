import { Server } from "http"
import createApp, { json } from "express"
import { TaskController } from "./TaskController"
import { once } from "events"

export class ApiServer {
  public async start(taskController: TaskController): Promise<Server> {
    const app = createApp()

    app.use(json())
    app.post("/task", (req, res) => taskController.create(req, res))
    app.get("/task", (req, res) => taskController.findTasksDueToday(req, res))

    const server = app.listen(5000)

    await once(server, "listening")

    return server
  }
}
