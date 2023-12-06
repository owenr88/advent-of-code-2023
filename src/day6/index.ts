import { toNumber } from "lodash";

/**
 * Represents a winning method with the time held and distance travelled.
 */
type WinningMethod = {
  timeHeld: number;
  distanceTravelled: number;
};

/**
 * Represents the records containing the maximum time, record distance, and winning methods.
 */
type Records = {
  maxTime: number;
  recordDistance: number;
  winningMethods: WinningMethod[];
};

/**
 * Parses the input string and returns an array of records.
 * @param input The input string.
 * @returns An array of records.
 */
const prepare = (input: string): Records[] => {
  const lines = input.split(/\n/);
  const times: number[] =
    lines[0]
      .match(/^(Time|Distance):(.*)$/m)?.[2]
      .trim()
      .split(/\s/g)
      .filter(Boolean)
      .map(toNumber) ?? [];
  const distances: number[] =
    lines[1]
      .match(/^(Time|Distance):(.*)$/m)?.[2]
      .trim()
      .split(/\s/g)
      .filter(Boolean)
      .map(toNumber) ?? [];

  const data: Records[] = [];

  times.unshift(toNumber(times.reduce((a, t) => `${a}${t}`, "")));
  distances.unshift(toNumber(distances.reduce((a, t) => `${a}${t}`, "")));

  times.forEach((maxTime, index) => {
    const recordDistance = distances[index];
    const winningMethods: WinningMethod[] = [];
    for (let timeHeld = 0; timeHeld <= maxTime; timeHeld++) {
      const timeRemaining = maxTime - timeHeld;
      const distanceTravelled = timeHeld * timeRemaining;
      if (distanceTravelled <= recordDistance) continue;
      winningMethods.push({
        timeHeld,
        distanceTravelled,
      });
    }
    data.push({
      maxTime,
      recordDistance,
      winningMethods,
    });
  });
  return data;
};

/**
 * Calculates the total number of winning methods for part one.
 * @param input The input string.
 * @returns The total number of winning methods.
 */
export const partOne = (input: string): number => {
  const [_, ...data] = prepare(input);
  const methodTotal = data.reduce((acc, curr) => {
    return acc * curr.winningMethods.length;
  }, 1);
  return methodTotal;
};

/**
 * Calculates the number of winning methods for part two.
 * @param input The input string.
 * @returns The number of winning methods.
 */
export const partTwo = (input: string): number => {
  const data = prepare(input);
  return data[0].winningMethods.length;
};
