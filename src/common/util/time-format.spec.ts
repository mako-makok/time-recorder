import { describe, expect, it } from "vitest";
import { formatHHmm } from "./time-format";

describe("time-format", () => {
  it("数字4桁", () => {
    const actual = formatHHmm("0900");
    expect(actual).toBe("09:00");
  });
  it("数字3桁", () => {
    const actual = formatHHmm("090");
    expect(actual).toBe("09:00");
  });
  it("数字2桁", () => {
    const actual = formatHHmm("09");
    expect(actual).toBe("09:00");
  });
  it("数字1桁", () => {
    const actual = formatHHmm("9");
    expect(actual).toBe("09:00");
  });
  it("コロン混じり数字3桁", () => {
    const actual = formatHHmm("09:0");
    expect(actual).toBe("09:00");
  });
  it("コロン混じり数字3桁", () => {
    const actual = formatHHmm("09:0");
    expect(actual).toBe("09:00");
  });
  it("コロン混じり数字4桁", () => {
    const actual = formatHHmm("09:00");
    expect(actual).toBe("09:00");
  });
  it("コロン2つ", () => {
    expect(() => formatHHmm("09:00:98")).toThrow(Error);
  });
  it("数値とコロン以外が混入", () => {
    expect(() => formatHHmm("09:a")).toThrow(Error);
  });
});
