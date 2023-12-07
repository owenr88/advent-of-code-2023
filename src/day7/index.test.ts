import { partOne, partTwo } from "./index";
import input from "./input";

const sampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe("day 7", () => {
  describe("part 1", () => {
    test("challenge 1 sample data", () => {
      expect(partOne(sampleInput)).toBe(6440);
    });
    test("challenge 1 real data", () => {
      expect(partOne(input)).toBe(251058093);
    });
  });
  describe("part 2", () => {
    test("challenge 2 sample data", () => {
      expect(partTwo(sampleInput)).toBe(5905);
    });
    test("challenge 2 real data", () => {
      expect(partTwo(input)).toBe(249781879);
    });
  });
});
