// import { describe } from "node:test";

import { classNames } from "./";

describe("classNames", () => {
   test("test", () => {
      expect(classNames("someClass")).toBe("someClass");
   });
});
