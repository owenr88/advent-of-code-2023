import { first, toNumber } from "lodash";

type Instruction = {
  values: string; // . | # | ?
  numbers: number[];
};

/**
 * Input the string and return an array
 * @param input string
 */
const prepare = (input: string): Instruction[] => {
  return input.split(/\n/).map((n) => {
    const [instruction, numbers] = n.split(" ");
    return {
      values: instruction as unknown as Instruction["values"],
      numbers: numbers.split(",").map(toNumber),
    } as Instruction;
  });
};

export const doesSatisfy = (instruction: Instruction): boolean => {
  let stepsSinceNotEmpty = 0;
  let numbersToMatch = instruction.numbers;
  for (let i = 0; i <= instruction.values.length; i++) {
    const value = instruction.values[i];
    if (value === "." || !value) {
      if (first(numbersToMatch) === stepsSinceNotEmpty) {
        numbersToMatch.splice(0, 1);
      } else {
        return false;
      }
      stepsSinceNotEmpty = 0;
    } else if (value === "#") {
      stepsSinceNotEmpty++;
    }
  }
  return numbersToMatch.length === 0;
};

const getRowArrangements = (row: Instruction): number => {
  return 0;
};

/**
 * @param input String input
 */
export const partOne = (input: string) => {
  const data = prepare(input);
  return data.reduce((acc, row) => {
    return acc + getRowArrangements(row);
  }, 0);
};

/**
 * @param input String input
 */
export const partTwo = (input: string) => {
  const data = prepare(input);
  return 0;
};
