import { describe, expect, test } from "bun:test";

import { doesSatisfy, partOne, partTwo } from "./index";
import input from "./input.txt";

const samplePreInput = `#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1`;

const sampleInputSatisfies = `#.#.### 1,1,3`;
const sampleInputSatisfiesFalse = `##..### 1,1,3`;
const sampleInput = `???.### 1,1,3`;

const sampleInput2 = `.#...#....###. 1,1,3`;

const sampleInput3 = `?###???????? 3,2,1`;

const sampleInput4 = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

describe("day 12", () => {
  describe("part 1", () => {
    test("challenge 1 sample data satisfies", () => {
      expect(
        doesSatisfy({
          numbers: [1, 1, 3],
          values: "#.#.###",
        })
      ).toBe(true);
    });
    test("challenge 1 sample data not satisfies", () => {
      expect(
        doesSatisfy({
          numbers: [1, 1, 3],
          values: "##..###",
        })
      ).toBe(false);
    });
    test("challenge 1 sample data 1", () => {
      expect(partOne(sampleInput)).toBe(1);
    });
    test("challenge 1 sample data 2", () => {
      expect(partOne(sampleInput2)).toBe(4);
    });
    test("challenge 1 sample data 3", () => {
      expect(partOne(sampleInput3)).toBe(10);
    });
    test("challenge 1 sample data 4", () => {
      expect(partOne(sampleInput4)).toBe(21);
    });
    test.todo("challenge 1 real data", () => {
      expect(partOne(input)).toBe(0);
    });
  });
  describe.todo("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput)).toBe(0);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(0);
    });
  });
});
