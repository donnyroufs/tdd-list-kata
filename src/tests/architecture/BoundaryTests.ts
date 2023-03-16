import "tsarch/dist/jest"

import { filesOfProject } from "tsarch"
import { Describe, Test } from "@jest-decorated/core"

@Describe()
export class BoundaryTests {
  @Test()
  public async CoreCannotReachAdapters(): Promise<void> {
    const rule = filesOfProject()
      .inFolder("core")
      .shouldNot()
      .dependOnFiles()
      .inFolder("adapters")

    await expect(rule).toPassAsync()
  }
}
