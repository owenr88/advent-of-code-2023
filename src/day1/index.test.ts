import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const sampleInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe("day 1", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(142);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(54644);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput2)).toBe(281);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(53348);
    });
  });
});
