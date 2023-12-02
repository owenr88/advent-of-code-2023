import { chain, max } from "lodash";

type Color = "red" | "green" | "blue";

/**
 * Maps a color string to a Color object.
 * @param n The color string.
 * @returns The Color object.
 */
const mapColor = (n: string) => {
  const [value, color] = n
    .trim()
    .split(" ")
    .map((n) => n.trim());
  return {
    color: color as unknown as Color,
    cubes: parseInt(value ?? "0"),
  };
};

/**
 * Maps a set string to an array of Color objects.
 * @param n The set string.
 * @returns The array of Color objects.
 */
const mapSet = (n: string) => n.trim().split(",").map(mapColor) ?? [];

/**
 * Prepares the input string and returns an array of game objects.
 * @param input The input string.
 * @returns The array of game objects.
 */
const prepare = (input: string) => {
  return chain(input)
    .split(/\n/)
    .filter(Boolean)
    .map((n) => {
      const val = n.match(/^Game (\d+):\s(.*)/);
      return {
        id: parseInt(val?.[1] ?? "0"),
        sets: val?.[2].split(";").map(mapSet) ?? [],
      };
    })
    .value();
};

/**
 * Calculates the result for part one of the problem.
 * @param input The input string.
 * @returns The result for part one.
 */
export const partOne = (input: string) => {
  const data = prepare(input);
  const limits: { [key in Color]: number } = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const filtered = data.filter((d) => {
    return d.sets.every((s) => s.every((c) => c.cubes <= limits[c.color]));
  });
  return filtered.reduce((a, d) => a + d.id, 0);
};

/**
 * Calculates the result for part two of the problem.
 * @param input The input string.
 * @returns The result for part two.
 */
export const partTwo = (input: string) => {
  const data = prepare(input);
  return data.reduce((acc, game) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    // Loop through eat set and get the highest number
    game.sets.forEach((set) => {
      red = max([red, set.find((c) => c.color === "red")?.cubes ?? 0]) ?? 0;
      green =
        max([green, set.find((c) => c.color === "green")?.cubes ?? 0]) ?? 0;
      blue = max([blue, set.find((c) => c.color === "blue")?.cubes ?? 0]) ?? 0;
    });
    return acc + red * green * blue;
  }, 0);
};
