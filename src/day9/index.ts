import { first, last, toNumber } from "lodash";

/**
 * Prepare the input string and return an array of numbers.
 * Each line in the input string is split by whitespace and converted to numbers.
 * Empty lines are filtered out.
 * @param input The input string
 * @returns An array of numbers
 */
const prepare = (input: string): number[][] => {
  return input
    .split(/\n/)
    .filter(Boolean)
    .map((n) => n.trim().split(/\s/).map(toNumber));
};

/**
 * Get the steps between each number in the given row.
 * @param row The row of numbers
 * @returns An array of steps
 */
const getSteps = (row: number[]): number[] => {
  let steps: number[] = [];
  row.forEach((current, i) => {
    let next = row[i + 1];
    if (next === undefined) return;
    steps.push(next - current);
  });
  return steps;
};

/**
 * Calculate the sum of the final values obtained by following the steps in the input.
 * @param input The input string
 * @returns The sum of the final values
 */
export const partOne = (input: string): number => {
  const data = prepare(input);
  let total = 0;

  // Loop through each row
  data.forEach((row) => {
    let previousSteps = [row];

    // Loop until we have all zeroes
    while (last(previousSteps)?.filter(Boolean).length) {
      const currentSteps = getSteps(last(previousSteps) ?? []);
      previousSteps.push(currentSteps);
    }

    // Reverse it and add 0 on the end
    previousSteps.reverse();
    previousSteps[0].push(0);

    // Go back through the steps and add the new prediction
    previousSteps.forEach((row, i) => {
      const nextRow = previousSteps[i + 1];
      if (nextRow === undefined) return;
      const thisFinal = last(row) ?? 0;
      const nextFinal = last(nextRow) ?? 0;
      nextRow.push(nextFinal + thisFinal);
    });

    // Add the final value up
    total += last(last(previousSteps) ?? []) ?? 0;
  });
  return total;
};

/**
 * Calculate the sum of the first values obtained by following the steps in the input.
 * @param input The input string
 * @returns The sum of the first values
 */
export const partTwo = (input: string): number => {
  const data = prepare(input);
  let total = 0;

  // Loop through each row
  data.forEach((row) => {
    let previousSteps = [row];

    // Loop until we have all zeroes
    while (last(previousSteps)?.filter(Boolean).length) {
      const currentSteps = getSteps(last(previousSteps) ?? []);
      previousSteps.push(currentSteps);
    }

    // Reverse it and add 0 at the start
    previousSteps.reverse();
    previousSteps[0].unshift(0);

    // Go back through the steps and add the new prediction
    previousSteps.forEach((row, i) => {
      const nextRow = previousSteps[i + 1];
      if (nextRow === undefined) return;
      const thisFirst = first(row) ?? 0;
      const nextFirst = first(nextRow) ?? 0;
      nextRow.unshift(nextFirst - thisFirst);
    });

    // Add the first value up
    total += first(last(previousSteps) ?? []) ?? 0;
  });
  return total;
};
