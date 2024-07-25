import { argv } from "bun";
import chalk from "chalk";
import { formatPerformance, isBetween, withPerformance } from "./utils";

const day = parseInt(argv[2] ?? "");
const year = new Date().getFullYear();

if (!isBetween(day, [1, 25])) {
  console.log(`🎅 Pick a day between ${chalk.bold(1)} and ${chalk.bold(25)}.`);
  console.log(`🎅 To get started, try: ${chalk.cyan("bun solve 1")}`);
  process.exit(0);
}

const name = `day${day}`;

const { default: input } = await import(`../src/${name}/input.txt`);
const { partOne, partTwo } = await import(`../src/${name}/index.ts`);

const [one, onePerformance] = withPerformance(() => partOne?.(input));
const [two, twoPerformance] = withPerformance(() => partTwo?.(input));

console.log(
  "🌲",
  "Part One:",
  chalk.green(one ?? "—"),
  one ? `(${formatPerformance(onePerformance)})` : ""
);
console.log(
  "🎄",
  "Part Two:",
  chalk.green(two ?? "—"),
  two ? `(${formatPerformance(twoPerformance)})` : ""
);
