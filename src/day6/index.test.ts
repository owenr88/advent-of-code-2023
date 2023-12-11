import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `Time:      7  15   30
Distance:  9  40  200`;

describe("day 6", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(288);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(1624896);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput)).toBe(71503);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(32583852);
    });
  });
});
