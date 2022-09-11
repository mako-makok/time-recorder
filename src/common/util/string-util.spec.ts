import { describe, expect, it } from "vitest";
import { stringValueIsNumber } from "./string-util";

describe("time-format", () => {
  it("数字のみ", () => {
    const actual = stringValueIsNumber("0900");
    expect(actual).toBe(true);
  });
  it("全角数字が混じっている", () => {
    const actual = stringValueIsNumber("0900０");
    expect(actual).toBe(false);
  });
  it("文字列が混じっている", () => {
    const actual = stringValueIsNumber("0900a");
    expect(actual).toBe(false);
  });
});
