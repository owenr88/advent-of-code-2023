import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input.txt";

const sampleInput = ``;

describe("day {{day}}", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(0);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(0);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput)).toBe(0);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(0);
    });
  });
});
