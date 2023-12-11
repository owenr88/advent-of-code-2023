import { describe, expect, test } from "bun:test";

import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const sampleInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const sampleInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

describe("day 8", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(2);
    });
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput2)).toBe(6);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(21797);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput3)).toBe(6);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(23977527174353);
    });
  });
});
