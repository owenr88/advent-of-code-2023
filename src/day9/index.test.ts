import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe("day 9", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(114);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(1743490457);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput)).toBe(2);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(1053);
    });
  });
});
