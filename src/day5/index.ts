import { isUndefined, min, toNumber, values } from "lodash";

/**
 * Represents the possible sources of data.
 */
type Source =
  | "seed"
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "location";

/**
 * Represents a range lookup object.
 */
type RangeLookup = {
  source: number;
  destination: number;
  length: number;
};

/**
 * Returns a function that performs a range value lookup based on the provided values.
 * @param values An array of RangeLookup objects.
 * @returns A function that performs the range value lookup.
 */
const getRangeValueLookup = (values: RangeLookup[]) => {
  return (value: number) => {
    const item = values.find(
      (v) => value >= v.source && value < v.source + v.length
    );
    if (!item) return value;
    const difference = value - item.source;
    return item.destination + difference;
  };
};

/**
 * Returns a function that performs a reverse range value lookup based on the provided values.
 * @param values An array of RangeLookup objects.
 * @returns A function that performs the reverse range value lookup.
 */
const getReverseRangeValueLookup = (values: RangeLookup[]) => {
  return (value: number) => {
    const item = values.find(
      (v) => value >= v.destination && value < v.destination + v.length
    );
    if (!item) return value;
    const difference = value - item.destination;
    return item.source + difference;
  };
};

/**
 * Parses the input string and returns an array of prepared data.
 * @param input The input string.
 * @returns An array of prepared data.
 */
const prepare = (input: string) => {
  return input
    .split(/\n\n/)
    .filter(Boolean)
    .map((n) => {
      const regex = new RegExp(/^([a-zA-Z\-]+)(\smap)?:[\s\n]?(.*)/, "ms");
      const matches = n.match(regex);
      const name = matches?.[1];
      if (name === "seeds") {
        const values = matches?.[3]?.trim().split(/\s/).map(toNumber) ?? [];
        let pairs = [];
        for (let i = 0; i < values.length; i++) {
          if (i % 2 === 0 || !i) {
            pairs.push({
              start: values[i],
              end: values[i] + (values[i + 1] ?? 0) - 1,
            });
          }
        }
        return {
          source: "seed" as Source,
          destination: "seed" as Source,
          values,
          pairs,
        };
      }
      const [source, destination] = name?.split("-to-") ?? [];
      const values: RangeLookup[] =
        matches?.[3]
          ?.trim()
          .split(/\n/)
          .map((v) => {
            const [destination, source, length] =
              v?.split(" ").map(toNumber) ?? [];
            return { destination, source, length };
          }) ?? [];
      return {
        source: (source ?? "seed") as Source,
        destination: (destination ?? "seed") as Source,
        lookup: getRangeValueLookup(values),
        reverseLookup: getReverseRangeValueLookup(values),
      };
    });
};

/**
 * Calculates the solution for part one of the problem.
 * @param input The input string.
 * @returns The solution for part one.
 */
export const partOne = (input: string) => {
  const data = prepare(input);
  const [seeds, ...rest] = data;
  let locations: number[] = [];
  values(seeds.values).forEach((seed) => {
    let prevId = seed;
    rest.forEach((item) => {
      const newValue = item.lookup?.(prevId);
      if (!isUndefined(newValue)) {
        prevId = newValue;
      }
    });
    locations.push(prevId);
  });
  return min(locations);
};

/**
 * Calculates the solution for part two of the problem.
 * @param input The input string.
 * @returns The solution for part two.
 */
export const partTwo = (input: string) => {
  const data = prepare(input);
  const [seeds, ...rest] = data;
  let steps = rest.reverse();
  let location = 0;
  let found = false;
  while (!found && location < 100000000) {
    let prevId = location;
    steps.forEach((item) => {
      const newValue = item.reverseLookup?.(prevId);
      if (!isUndefined(newValue)) {
        prevId = newValue;
      }
    });
    const isInRange =
      seeds.pairs?.filter((s) => prevId >= s.start && prevId <= s.end) ?? [];
    if (isInRange.length) {
      found = true;
    } else {
      location += 1;
    }
  }
  return location;
};
