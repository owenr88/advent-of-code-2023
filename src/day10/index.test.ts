import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `.....
.S-7.
.|.|.
.L-J.
.....`;

const sampleInput2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const sampleInput3 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

describe("day 10", () => {
  describe("part 1", () => {
    test("challenge 1 sample data 1", () => {
      expect(partOne(sampleInput)).toBe(4);
    });
    test("challenge 1 sample data 2", () => {
      expect(partOne(sampleInput2)).toBe(8);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(6714);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data 1", () => {
      expect(partTwo(sampleInput)).toBe(1);
    });
    test("challenge 2 sample data 2", () => {
      expect(partTwo(sampleInput2)).toBe(1);
    });
    test("challenge 2 sample data 3", () => {
      expect(partTwo(sampleInput3)).toBe(4);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(0);
    });
  });
});
