import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input.txt";

const sampleInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

describe("day 11", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(374);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(10494813);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput, 10)).toBe(1030);
    });
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput, 100)).toBe(8410);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input, 1000000)).toBe(840988812853);
    });
  });
});
