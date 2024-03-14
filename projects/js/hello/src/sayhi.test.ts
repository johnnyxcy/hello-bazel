import { expect, test, vi } from "vitest";

import { sayHi } from "@/say";

test("sayhi", () => {
  // spy on console.log
  const captured = [];
  vi.spyOn(console, "log").mockImplementation((...data) => {
    // record the call
    captured.push(data);
  });
  sayHi({
    log: (...data) => console.log(data),
  });

  expect(captured.length).toBe(1);
});
