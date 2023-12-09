/**
 * Represents the input data for the Advent of Code Day 8 challenge.
 */
interface Day8Input {
  directions: string[];
  map: {
    start: string;
    left: string;
    right: string;
  }[];
}

/**
 * Parses the input string and prepares the data for the Advent of Code Day 8 challenge.
 * @param input The input string.
 * @returns The prepared data.
 */
const prepare = (input: string): Day8Input => {
  const [directions, map] = input.split(/\n\n/).filter(Boolean);
  return {
    directions: directions.split("").filter(Boolean),
    map: map
      .split(/\n/)
      .map((line) => {
        const match = line.match(
          /^([A-Z0-9]{3})\s=\s\(([A-Z0-9]{3})\,\s([A-Z0-9]{3})\)$/
        );
        const [_, start, left, right] = match ?? [];
        return {
          start,
          left,
          right,
        };
      })
      .filter(Boolean),
  };
};

/**
 * Solves part one of the Advent of Code Day 8 challenge.
 * @param input The input string.
 * @returns The solution for part one.
 */
export const partOne = (input: string): number => {
  const data = prepare(input);

  let steps = 0;
  let step: string = "AAA";

  while (step !== "ZZZ") {
    const current = data.map.find((item) => item.start === step);
    if (!current) break;
    const dir = data.directions[steps % data.directions.length];
    if (dir === "R") step = current.right;
    else step = current.left;
    steps += 1;
  }

  return steps;
};

/**
 * Calculates the greatest common divisor of two numbers.
 * @param a The first number.
 * @param b The second number.
 * @returns The greatest common divisor.
 */
const gcd = (a: number, b: number): number => {
  while (b > 0) [a, b] = [b, a % b];
  return a;
};

/**
 * Calculates the least common multiple of two numbers.
 * @param a The first number.
 * @param b The second number.
 * @returns The least common multiple.
 */
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

/**
 * Solves part two of the Advent of Code Day 8 challenge.
 * @param input The input string.
 * @returns The solution for part two.
 */
export const partTwo = (input: string): number => {
  const data = prepare(input);

  let starters = data.map.filter((i) => i.start.slice(-1) === "A");

  const lengths = starters
    .map((s) => s.start)
    .map((start) => {
      let steps = 0;
      let curr = start;
      for (
        let i = 0;
        curr && curr?.slice(-1) !== "Z";
        i = (i + 1) % data.directions.length
      ) {
        steps++;
        const dir = data.directions[i];

        const current = data.map.find((item) => item.start === curr);
        if (!current) break;
        if (dir === "R") {
          curr = current.right;
        } else {
          curr = current.left;
        }
      }
      return steps;
    });
  return lengths.reduce((n, x) => lcm(x, n), 1);
};
