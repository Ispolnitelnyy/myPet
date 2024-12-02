// import { describe } from "node:test";

import { classNames } from "./";

describe("classNames", () => {
   test("с одним первым параметром", () => {
      expect(classNames("someClass")).toBe("someClass");
   });

   test("с дополнительным классом", () => {
      const expected = "someClass class1 class2";
      expect(classNames("someClass", {}, ["class1", "class2"])).toBe(expected);
   });

   test("с модами", () => {
      const expected = "someClass class1 class2 hovered scrollable";
      expect(
         classNames("someClass", { hovered: true, scrollable: true }, [
            "class1",
            "class2",
         ])
      ).toBe(expected);
   });

   test("с модами (один false)", () => {
      const expected = "someClass class1 class2 hovered";
      expect(
         classNames("someClass", { hovered: true, scrollable: false }, [
            "class1",
            "class2",
         ])
      ).toBe(expected);
   });

   test("с модами (один undefined)", () => {
    const expected = "someClass class1 class2 hovered";
    expect(
       classNames("someClass", { hovered: true, scrollable: undefined }, [
          "class1",
          "class2",
       ])
    ).toBe(expected);
 });

});
