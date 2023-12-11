import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `
467..114..
...*......
..35.633..
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
// const sampleInput = `467..114..
// ...*......
// ..35..633.`;

describe("day 3", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(4361);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(559667);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput)).toBe(467835);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(86841457);
    });
  });
});
